// Minimal registration adapter for the Eureka REST API. It does not fetch a registry or perform load balancing.
function createRegistry({ host, port, registryUrl = 'http://eureka:8761/eureka/', intervalMs = 30000 }) {
  const base = new URL('apps/RESERVATION', registryUrl.endsWith('/') ? registryUrl : registryUrl + '/').href;
  const instanceId = `${host}:reservation:${port}`;
  const url = `${base}/${encodeURIComponent(instanceId)}`;
  let timer;
  let stopped = false;
  const send = (target, options) => fetch(target, { ...options, headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, signal: AbortSignal.timeout(5000) });
  async function register() {
    const response = await send(base, { method: 'POST', body: JSON.stringify({ instance: {
      instanceId, app: 'RESERVATION', hostName: host, ipAddr: host, status: 'UP', vipAddress: 'reservation',
      port: { '$': port, '@enabled': 'true' }, securePort: { '$': 443, '@enabled': 'false' },
      homePageUrl: `http://${host}:${port}/`, statusPageUrl: `http://${host}:${port}/reservation/reservations`,
      dataCenterInfo: { '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo', name: 'MyOwn' },
      leaseInfo: { renewalIntervalInSecs: 30, durationInSecs: 90 }
    } }) });
    if (!response.ok) throw new Error('Eureka registration failed');
  }
  async function heartbeat() {
    if (stopped) return;
    const response = await send(url, { method: 'PUT' });
    if (response.status === 404) return register();
    if (!response.ok) throw new Error('Eureka heartbeat failed');
  }
  return {
    async start() {
      try { await register(); } catch { console.warn('Eureka unavailable; registration will retry.'); }
      timer = setInterval(() => heartbeat().catch(() => console.warn('Eureka heartbeat failed; retrying next interval.')), intervalMs);
      timer.unref();
    },
    heartbeat,
    async stop() {
      if (stopped) return;
      stopped = true;
      clearInterval(timer);
      try { await send(url, { method: 'DELETE' }); } catch { /* A stopped service will also expire from Eureka. */ }
    }
  };
}
module.exports = { createRegistry };
