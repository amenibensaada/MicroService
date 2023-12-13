const mongoose = require('mongoose');
const express = require('express');
const Eureka = require('eureka-js-client').Eureka;
const bodyParser = require('body-parser');
require('dotenv').config(); 

const app = express();
const port = 3000;
const hostName = (process.env.HOSTNAME || 'localhost')
const eurekaHost = process.env.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE || 'eureka';


const client = new Eureka({
  instance: {
    app: 'reservation',
    hostName: hostName,
    ipAddr: '172.19.0.2',
    port: {
      '$': 8080 ,
      '@enabled': 'true',
    },
    vipAddress: 'reservation',
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
  },
  eureka: {
    host: eurekaHost, 
    port: 8761, 
    servicePath: '../Eureka',
  },
});

client.start();


mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  app.use(bodyParser.json());
const reservationSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  reservationDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  etudiantId: {
    type: [Number], 
    required: true,
  },
  chamberId: {
    type: Number,
    required: true,
  },
});

const Reservation = mongoose.model('Reservation', reservationSchema);

app.post('/reservation/reservations', async (req, res) => {
    try {
      const reservation = new Reservation(req.body);
      await reservation.save();
      res.status(201).json(reservation);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
app.use((req, res, next) => { 
  console.log(req.baseUrl,req)
next();
})
app.get('/reservation/reservations', async (req, res) => {
    try {
      const reservations = await Reservation.find();
      res.json(reservations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  app.get('/reservation/reservations/:id', async (req, res) => {
    try {
      const reservation = await Reservation.findById(req.params.id);
      if (!reservation) {
        return res.status(404).json({ error: 'Reservation not found' });
      }
      res.json(reservation);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  app.get('/reservation/reservations/chamber/:chamberId', async (req, res) => {
    try {
      const reservations = await Reservation.find({ chamberId: req.params.chamberId });
      res.json(reservations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  app.put('/reservation/reservations/:id', async (req, res) => {
    try {
      const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!reservation) {
        return res.status(404).json({ error: 'Reservation not found' });
      }
      res.json(reservation);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  app.delete('/reservation/reservations/:id', async (req, res) => {
    try {
      const reservation = await Reservation.findByIdAndDelete(req.params.id);
      if (!reservation) {
        return res.status(404).json({ error: 'Reservation not found' });
      }
      res.json({ message: 'Reservation deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  
  module.exports = Reservation;
