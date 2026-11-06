const { test } = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const request = require('supertest');
const { createApp } = require('../app');
const Reservation = require('../model');
test('MongoDB persists a reservation through its complete HTTP lifecycle', { skip: !process.env.MONGODB_TEST_URL }, async () => {
  await mongoose.connect(process.env.MONGODB_TEST_URL);
  const api = request(createApp());
  let id;
  try {
    const created = await api.post('/reservation/reservations').send({ chamberId: 23, etudiantId: [8] }).expect(201);
    id = created.body._id;
    const saved = await api.get('/reservation/reservations/' + id).expect(200);
    assert.equal(saved.body.chamberId, 23);
    await api.put('/reservation/reservations/' + id).send({ chamberId: 24, etudiantId: [8] }).expect(200);
    await api.delete('/reservation/reservations/' + id).expect(200);
    await api.get('/reservation/reservations/' + id).expect(404);
  } finally { if (id) await Reservation.deleteOne({ _id: id }); await mongoose.disconnect(); }
});
