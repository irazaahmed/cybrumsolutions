import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

/**
 * Lazily-created Neon Postgres client (HTTP driver, ideal for serverless
 * route handlers). Returns null when DATABASE_URL is not configured, so lead
 * capture degrades gracefully instead of throwing: the email path still runs.
 */
let cached: NeonQueryFunction<false, false> | null = null;

export function getSql(): NeonQueryFunction<false, false> | null {
  if (cached) return cached;
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  cached = neon(url);
  return cached;
}
