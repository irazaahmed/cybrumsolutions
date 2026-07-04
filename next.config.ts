import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Blog translations moved from ?lang= query params to real paths
      // (/blog/slug/ur). Permanent redirects preserve old indexed/shared
      // links. The named capture group feeds :lang into the destination,
      // which also stops the query param being passed through.
      {
        source: "/blog/:slug",
        has: [{ type: "query", key: "lang", value: "(?<lang>ur|ro)" }],
        destination: "/blog/:slug/:lang",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
