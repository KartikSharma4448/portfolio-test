import { log } from "./vite";

const PING_INTERVAL = 13 * 60 * 1000; // 13 minutes in milliseconds
const MAX_RETRIES = 3;

export function startKeepAlive() {
  if (process.env.NODE_ENV !== 'production') {
    log('Keep-alive service disabled in development mode');
    return;
  }

  const baseUrl = process.env.RENDER_EXTERNAL_URL || process.env.BASE_URL;
  
  if (!baseUrl) {
    log('Keep-alive service disabled: No RENDER_EXTERNAL_URL or BASE_URL found');
    return;
  }

  const healthUrl = `${baseUrl}/health`;
  
  log(`Keep-alive service started. Will ping ${healthUrl} every ${PING_INTERVAL / 60000} minutes`);

  const ping = async (retryCount = 0) => {
    try {
      const response = await fetch(healthUrl);
      if (response.ok) {
        log(`Keep-alive ping successful at ${new Date().toISOString()}`);
      } else {
        throw new Error(`Health check returned status ${response.status}`);
      }
    } catch (error) {
      if (retryCount < MAX_RETRIES) {
        log(`Keep-alive ping failed (attempt ${retryCount + 1}/${MAX_RETRIES}), retrying...`);
        setTimeout(() => ping(retryCount + 1), 5000);
      } else {
        log(`Keep-alive ping failed after ${MAX_RETRIES} attempts:`, error instanceof Error ? error.message : 'Unknown error');
      }
    }
  };

  setInterval(ping, PING_INTERVAL);
  
  setTimeout(ping, 60000);
}
