const { test } = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const { createRegistry } = require('../registry');
test('Eureka registration, missing-lease renewal and deregistration use the correct HTTP contract', async () => {
  const calls = [];
  const server = http.createServer(async (req, res) => {
    let body = ''; for await (const chunk of req) body += chunk;
    calls.push({ method: req.method, path: req.url, body: body ? JSON.parse(body) : null });
    res.statusCode = req.method === 'POST' ? 204 : req.method === 'PUT' ? 404 : 200;
    res.end();
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const registry = createRegistry({ host: 'reservation', port: 3000, registryUrl: `http://127.0.0.1:${server.address().port}/eureka/` });
  try {
    await registry.start(); await registry.heartbeat(); await registry.stop();
    assert.deepEqual(calls.map(x => x.method), ['POST', 'PUT', 'POST', 'DELETE']);
    assert.equal(calls[0].path, '/eureka/apps/RESERVATION');
    assert.equal(calls[0].body.instance.port['$'], 3000);
    assert.equal(calls[0].body.instance.hostName, 'reservation');
    assert.equal(calls[1].path, '/eureka/apps/RESERVATION/reservation%3Areservation%3A3000');
  } finally { await registry.stop(); await new Promise(resolve => server.close(resolve)); }
});
