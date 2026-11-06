const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
  reservationDate: { type: Date, required: true, default: Date.now },
  etudiantId: { type: [Number], required: true },
  chamberId: { type: Number, required: true }
});
module.exports = mongoose.model('Reservation', schema);
