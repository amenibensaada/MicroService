require('dotenv').config();
const mongoose = require('mongoose');
const { createRegistry } = require('./registry');
const { createApp } = require('./app');

async function start() {
  const port = Number(process.env.PORT || 3000);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Invalid PORT');
  await mongoose.connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/reservation');
  const server = createApp().listen(port, '0.0.0.0');
  let registry;
  if (process.env.EUREKA_ENABLED !== 'false') {
    const host = process.env.HOSTNAME || 'localhost';
    const registryHost = process.env.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE || 'eureka';
    registry = createRegistry({ host, port, registryUrl: `http://${registryHost}:8761/eureka/` });
    await registry.start();
  }
  const shutdown = () => {
    registry?.stop().catch(() => {});
    server.close(() => mongoose.disconnect());
  };
  process.once('SIGTERM', shutdown);
  process.once('SIGINT', shutdown);
  return server;
}
if (require.main === module) start().catch(() => { console.error('Reservation service could not start; check database and service configuration.'); process.exitCode = 1; });
module.exports = { start };
