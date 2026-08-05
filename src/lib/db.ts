import { Pool } from "pg";

/**
 * Lazily-created Postgres connection pool for the raw-SQL lead capture path.
 * Uses the standard wire protocol (via `pg`) so the same DATABASE_URL works
 * whether it points at Neon or a self-hosted Postgres. Returns null when
 * DATABASE_URL is not configured, so lead capture degrades gracefully instead
 * of throwing: the email path still runs.
 */
let cached: Pool | null = null;

export function getPool(): Pool | null {
  if (cached) return cached;
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  cached = new Pool({ connectionString: url });
  return cached;
}
