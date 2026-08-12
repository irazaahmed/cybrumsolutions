import type { NextConfig } from "next";
import { ACADEMY_LIVE } from "./src/lib/site";

const nextConfig: NextConfig = {
  experimental: {
    // Default is 1MB, too small for the payment proof screenshot upload
    // (src/lib/enrollment/actions.ts#submitPayment) — those need headroom
    // up to the 5MB ceiling enforced in proof-storage.ts, plus multipart
    // overhead.
    serverActions: { bodySizeLimit: "6mb" },
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
