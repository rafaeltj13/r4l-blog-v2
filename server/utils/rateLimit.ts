/**
 * Shared in-memory rate limiting for AI endpoints (resets on server restart).
 * Extracted so `/api/chat` and `/api/cv/optimize` reuse the same logic
 * instead of each duplicating the map + window handling.
 */

interface RateRecord {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateRecord>();

export function checkRateLimit(
  ip: string,
  limit = 10,
  windowMs = 60 * 60 * 1000,
): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count++;
  return true;
}
