import { readAvatarFile } from "@/lib/enrollment/avatar-storage";

export const runtime = "nodejs";

// No auth check: a profile picture isn't sensitive, and this is what the
// Navbar's <img src="/avatar/..."> tag hits on every page load.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ filename: string }> },
): Promise<Response> {
  const { filename } = await params;
  const file = await readAvatarFile(filename);
  if (!file) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return new Response(new Uint8Array(file.buffer), {
    headers: { "Content-Type": file.contentType, "Cache-Control": "private, max-age=300" },
  });
}
