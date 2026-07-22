/**
 * Returns the full URL for the application, handling Vercel and local environments.
 * This function can be called on both server and client.
 * @returns {string} The full base URL of the app.
 */
export const getAppUrl = (): string => {
  // For production and preview deployments on Vercel, VERCEL_URL is the canonical URL.
  // It's provided by the system. We just need to add the protocol.
  // Example for main: "agro-finance-real.vercel.app"
  // Example for developer: "agro-finance-real-git-developer-....vercel.app"
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // For local development, we fall back to localhost.
  return 'http://localhost:3000';
};
