import { NextResponse, type NextRequest } from "next/server";

/**
 * Serves the exam notes page at the exam.cybrumsolutions.dev subdomain.
 * The subdomain root is rewritten to /exam; every other path (assets,
 * the PDFs under /exam/*.pdf, _next chunks) resolves normally, so the
 * same deployment powers both hosts. The main domain is untouched.
 */
export function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  if (host.startsWith("exam.")) {
    const url = request.nextUrl.clone();
    url.pathname = "/exam";
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

/* Only the root path needs host-based routing. */
export const config = {
  matcher: ["/"],
};
