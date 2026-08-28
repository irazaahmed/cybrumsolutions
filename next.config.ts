import type { NextConfig } from "next";
import { ACADEMY_LIVE } from "./src/lib/site";

// Cloudflare (the site's own CDN/proxy) auto-injects its Web Analytics
// beacon at the edge, so it needs an explicit CSP allowance even though it
// never appears in application source. 'unsafe-inline' on script/style is a
// pragmatic tradeoff: the theme-init script in layout.tsx and Framer
// Motion's inline `style={{...}}` props both need it, and there's no CSP
// nonce plumbing in this app yet.
//
// 'unsafe-eval' is added in script-src ONLY outside production: Next.js dev
// mode (React Fast Refresh's error-overlay stack-trace reconstruction)
// genuinely calls eval(), and without this the dev client logs a CSP error
// and the HMR websocket falls into a reconnect loop. React's own runtime
// confirms it "will never use eval() in production mode" — verified against
// this exact console warning while testing this header locally — so
// production keeps the stricter policy.
const isDev = process.env.NODE_ENV !== "production";
const CSP = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://static.cloudflareinsights.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://cloudflareinsights.com https://static.cloudflareinsights.com",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "base-uri 'self'",
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    // Default is 1MB, too small for the payment proof screenshot upload
    // (src/lib/enrollment/actions.ts#submitPayment) — those need headroom
    // up to the 5MB ceiling enforced in proof-storage.ts, plus multipart
    // overhead.
    serverActions: { bodySizeLimit: "6mb" },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // HSTS is production-only: dev serves plain HTTP, and Chrome caches
          // this header per-host — sending it over localhost:3000 makes the
          // browser force-upgrade every later local request to HTTPS (which
          // the dev server doesn't serve), hanging the page indefinitely
          // until the cached HSTS entry is manually cleared. Confirmed this
          // exact failure mode while testing this header locally.
          ...(isDev
            ? []
            : [{ key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" }]),
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Content-Security-Policy", value: CSP },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Blog translations moved from ?lang= query params to real paths
      // (/blogs/slug/ur). Permanent redirects preserve old indexed/shared
      // links. The named capture group feeds :lang into the destination,
      // which also stops the query param being passed through.
      {
        source: "/blog/:slug",
        has: [{ type: "query", key: "lang", value: "(?<lang>ur|ro)" }],
        destination: "/blogs/:slug/:lang",
        permanent: true,
      },
      // The /blog route was renamed to /blogs. These permanent redirects
      // preserve every previously indexed and shared /blog/* URL.
      {
        source: "/blog",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/blog/:path*",
        destination: "/blogs/:path*",
        permanent: true,
      },
      // CS Academy: when live, the enrollment portal's old top-level URLs
      // redirect to their /academy equivalents. When paused (ACADEMY_LIVE
      // false, see src/lib/site.ts), every one of those URLs — old and new —
      // instead redirects to the homepage, and nothing on the live site
      // renders /academy pages at all. Temporary (307/308 permanent: false)
      // because the pause is meant to be reversible.
      ...(ACADEMY_LIVE
        ? [
            {
              source: "/login",
              destination: "/academy/login",
              permanent: true,
            },
            {
              source: "/signup",
              destination: "/academy/signup",
              permanent: true,
            },
            {
              source: "/dashboard",
              destination: "/academy/dashboard",
              permanent: true,
            },
            {
              source: "/dashboard/profile",
              destination: "/academy/dashboard/profile",
              permanent: true,
            },
            {
              source: "/courses/:slug",
              destination: "/academy/courses/:slug",
              permanent: true,
            },
            {
              source: "/courses/:slug/enroll",
              destination: "/academy/courses/:slug/enroll",
              permanent: true,
            },
            {
              source: "/admin/enrollments",
              destination: "/academy/admin",
              permanent: true,
            },
          ]
        : [
            { source: "/login", destination: "/", permanent: false },
            { source: "/signup", destination: "/", permanent: false },
            { source: "/dashboard", destination: "/", permanent: false },
            { source: "/dashboard/profile", destination: "/", permanent: false },
            { source: "/courses/:slug", destination: "/", permanent: false },
            { source: "/courses/:slug/enroll", destination: "/", permanent: false },
            { source: "/admin/enrollments", destination: "/", permanent: false },
            { source: "/academy", destination: "/", permanent: false },
            { source: "/academy/:path*", destination: "/", permanent: false },
          ]),
    ];
  },
};

export default nextConfig;
