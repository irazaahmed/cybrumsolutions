/**
 * Lightweight in-memory rate limiter for the public API routes.
 *
 * Fixed-window counting per (scope, key). State lives in module memory, so on
 * serverless each warm instance keeps its own counters. That is fine here: the
 * goal is stopping cheap scripted abuse (form spam, chat token burning), not
 * cryptographic guarantees. If traffic ever justifies it, swap this for a
 * shared store (Upstash/Redis) behind the same function signature.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/** Drop expired entries so the map cannot grow without bound. */
function prune(now: number) {
  if (buckets.size < 1000) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export type RateLimitResult = {
  ok: boolean;
  /** Seconds until the window resets; only meaningful when ok is false. */
  retryAfterSeconds: number;
};

/**
 * Count one hit for `key` inside `scope` and report whether it is still under
 * `limit` hits per `windowMs`.
 */
export function rateLimit(
  scope: string,
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  prune(now);

  const id = `${scope}:${key}`;
  const bucket = buckets.get(id);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(id, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfterSeconds: 0 };
  }

  bucket.count += 1;
  if (bucket.count > limit) {
    return {
      ok: false,
      retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }
  return { ok: true, retryAfterSeconds: 0 };
}

/** Best-effort client IP behind Vercel's proxy; "unknown" bots share a bucket. */
export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}
