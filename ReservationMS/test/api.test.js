const { test } = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const { createApp } = require('../app');
const id = '507f1f77bcf86cd799439011';
const payload = { chamberId: 12, etudiantId: [4] };
function storage() {
  const records = new Map();
  return { create: async data => { const row = { _id: id, ...data }; records.set(id, row); return row; },
    find: async filter => [...records.values()].filter(row => !filter || row.chamberId === filter.chamberId),
    findById: async key => records.get(key),
    findByIdAndUpdate: async (key, data) => { if (!records.has(key)) return null; const row = { _id: key, ...data }; records.set(key, row); return row; },
    findByIdAndDelete: async key => { const row = records.get(key); records.delete(key); return row; } };
}
test('create, filter, update and remove a reservation', async () => {
  const api = request(createApp(storage()));
  await api.post('/reservation/reservations').send(payload).expect(201);
  const filtered = await api.get('/reservation/reservations/chamber/12').expect(200);
  assert.equal(filtered.body.length, 1);
  await api.get('/reservation/reservations/' + id).expect(200);
  const updated = await api.put('/reservation/reservations/' + id).send({ ...payload, chamberId: 13 }).expect(200);
  assert.equal(updated.body.chamberId, 13);
  await api.delete('/reservation/reservations/' + id).expect(200);
  await api.get('/reservation/reservations/' + id).expect(404);
});
for (const body of [{}, { ...payload, chamberId: -1 }, { ...payload, etudiantId: [] }, { ...payload, reservationDate: 'wrong' }, { ...payload, admin: true }]) {
  test('reject invalid payload ' + JSON.stringify(body), async () => { await request(createApp(storage())).post('/reservation/reservations').send(body).expect(400); });
}
test('invalid IDs and missing rows have different HTTP responses', async () => {
  const api = request(createApp(storage()));
  await api.get('/reservation/reservations/bad-id').expect(400);
  await api.get('/reservation/reservations/chamber/abc').expect(400);
  await api.put('/reservation/reservations/' + id).send(payload).expect(404);
  await api.delete('/reservation/reservations/' + id).expect(404);
});
test('database errors do not leak connection details', async () => {
  const api = request(createApp({ find: async () => { throw Error('private connection detail'); } }));
  const response = await api.get('/reservation/reservations').expect(500);
  assert.deepEqual(response.body, { error: 'Unable to process reservation' });
});
test('malformed JSON is a client error', async () => {
  await request(createApp(storage())).post('/reservation/reservations').set('Content-Type','application/json').send('{').expect(400);
});
