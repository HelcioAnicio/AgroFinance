const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '0.0.0.0']);

const normalizeUrl = (url: string) => {
  const trimmed = url.trim();
  if (!trimmed) return null;

  return trimmed.startsWith('http://') || trimmed.startsWith('https://')
    ? trimmed.replace(/\/$/, '')
    : `https://${trimmed.replace(/\/$/, '')}`;
};

const isLocalUrl = (url: string) => {
  try {
    return LOCAL_HOSTS.has(new URL(url).hostname);
  } catch {
    return false;
  }
};

export const getAppUrl = (request: Request) => {
  const requestOrigin = new URL(request.url).origin;

  if (!isLocalUrl(requestOrigin)) {
    return requestOrigin;
  }

  const configuredAppUrl =
    normalizeUrl(process.env.NEXT_PUBLIC_APP_URL ?? '') ??
    normalizeUrl(process.env.APP_URL ?? '') ??
    normalizeUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL ?? '') ??
    normalizeUrl(process.env.VERCEL_URL ?? '') ??
    normalizeUrl(process.env.NEXTAUTH_URL ?? '');

  return configuredAppUrl ?? requestOrigin;
};
