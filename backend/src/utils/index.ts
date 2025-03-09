import { Request } from 'express';

export const getClientIp = (req: Request): string => {
  // Get IP from various possible headers and fallback to remote address
  const ip =
    (req.headers['x-forwarded-for'] as string) ||
    (req.headers['x-real-ip'] as string) ||
    req.ip ||
    'unknown';

  return Array.isArray(ip) ? ip[0] : ip;
};
