import type { NextConfig } from "next";

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
    ];
  },
};

export default nextConfig;
