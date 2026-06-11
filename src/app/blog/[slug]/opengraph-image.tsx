import { ImageResponse } from "next/og";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { site } from "@/lib/site";

/**
 * Branded per-post Open Graph image (1200x630), generated at build time for
 * every English post. Shows the article title on the Cybrum dark+blue theme
 * so LinkedIn/WhatsApp shares look designed instead of generic.
 */

export const alt = `${site.name} article`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug, "en");
  const title = post?.title ?? site.name;
  const meta = post ? `${post.date}  ·  ${post.readingTime}` : site.tagline;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: "#0a0d14",
          backgroundImage:
            "linear-gradient(rgba(30,136,232,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(30,136,232,0.07) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          color: "#e9edf5",
          fontFamily: "sans-serif",
        }}
      >
        {/* top brand row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: 2,
            }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: 999,
                backgroundColor: "#1e88e8",
                boxShadow: "0 0 24px #1e88e8",
              }}
            />
            CYBRUM SOLUTIONS
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              color: "#46a4ff",
              border: "1px solid rgba(70,164,255,0.4)",
              borderRadius: 999,
              padding: "8px 22px",
              letterSpacing: 3,
            }}
          >
            INSIGHTS
          </div>
        </div>

        {/* title */}
        <div
          style={{
            display: "flex",
            fontSize: title.length > 70 ? 52 : 62,
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: -1,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>

        {/* footer row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#97a3b6",
          }}
        >
          <div style={{ display: "flex" }}>{meta}</div>
          <div style={{ display: "flex", color: "#46a4ff", fontWeight: 600 }}>
            {site.domain}
          </div>
        </div>

        {/* accent bottom border */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 10,
            background: "linear-gradient(90deg, #1564b0, #1e88e8, #46a4ff)",
          }}
        />
      </div>
    ),
    size,
  );
}
