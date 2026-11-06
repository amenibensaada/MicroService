const express = require('express');
const mongoose = require('mongoose');
const Reservation = require('./model');

function createApp(model = Reservation) {
  const app = express();
  app.use(express.json({ limit: '32kb' }));
  const editable = new Set(['reservationDate', 'etudiantId', 'chamberId']);
  const input = body => {
    if (!body || typeof body !== 'object' || Array.isArray(body) || Object.keys(body).some(key => !editable.has(key))) return null;
    if (!Number.isInteger(body.chamberId) || body.chamberId < 1 || !Array.isArray(body.etudiantId) || body.etudiantId.length === 0 || !body.etudiantId.every(id => Number.isInteger(id) && id > 0)) return null;
    if (body.reservationDate !== undefined && (typeof body.reservationDate !== 'string' || !Number.isFinite(Date.parse(body.reservationDate)))) return null;
    return { chamberId: body.chamberId, etudiantId: body.etudiantId, ...(body.reservationDate === undefined ? {} : { reservationDate: body.reservationDate }) };
  };
  const validId = (req, res, next) => {
    if (!mongoose.isObjectIdOrHexString(req.params.id)) return res.status(400).json({ error: 'Invalid reservation ID' });
    next();
  };
  const route = fn => (req, res, next) => Promise.resolve(fn(req, res)).catch(next);
  app.post('/reservation/reservations', route(async (req, res) => {
    const data = input(req.body);
    if (!data) return res.status(400).json({ error: 'Provide positive chamberId and etudiantId values, and an optional valid reservationDate' });
    res.status(201).json(await model.create(data));
  }));
  app.get('/reservation/reservations', route(async (_req, res) => res.json(await model.find())));
  app.get('/reservation/reservations/chamber/:chamberId', route(async (req, res) => {
    const chamberId = Number(req.params.chamberId);
    if (!Number.isInteger(chamberId) || chamberId < 1) return res.status(400).json({ error: 'Invalid chamber ID' });
    res.json(await model.find({ chamberId }));
  }));
  app.get('/reservation/reservations/:id', validId, route(async (req, res) => {
    const record = await model.findById(req.params.id);
    if (!record) return res.status(404).json({ error: 'Reservation not found' });
    res.json(record);
  }));
  app.put('/reservation/reservations/:id', validId, route(async (req, res) => {
    const data = input(req.body);
    if (!data) return res.status(400).json({ error: 'Invalid reservation payload' });
    const record = await model.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!record) return res.status(404).json({ error: 'Reservation not found' });
    res.json(record);
  }));
  app.delete('/reservation/reservations/:id', validId, route(async (req, res) => {
    const record = await model.findByIdAndDelete(req.params.id);
    if (!record) return res.status(404).json({ error: 'Reservation not found' });
    res.json({ message: 'Reservation deleted successfully' });
  }));
  app.use((error, _req, res, _next) => {
    const status = error.type === 'entity.too.large' ? 413 : error.type === 'entity.parse.failed' || error.name === 'ValidationError' ? 400 : 500;
    res.status(status).json({ error: status === 500 ? 'Unable to process reservation' : 'Invalid request' });
  });
  return app;
}
module.exports = { createApp };
