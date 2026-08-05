import { writeFile, readFile, mkdir } from "node:fs/promises";
import path from "node:path";

// Profile pictures — unlike payment proofs, these aren't sensitive, so they
// live in their own directory and are served by a route with no auth check
// (src/app/avatar/[filename]/route.ts), just like a normal static asset.
const UPLOAD_DIR = path.join(process.cwd(), "uploads", "avatars");
const MAX_SIZE_BYTES = 2 * 1024 * 1024;
const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function saveAvatarFile(studentId: string, file: File): Promise<string> {
  if (!(file.type in ALLOWED_TYPES)) {
    throw new Error("Only JPEG, PNG, or WEBP images are allowed.");
  }
  if (file.size > MAX_SIZE_BYTES) {
    throw new Error("File is too large (max 2MB).");
  }

  await mkdir(UPLOAD_DIR, { recursive: true });
  const ext = ALLOWED_TYPES[file.type];
  // Fixed name per student (not a random id) so a re-upload cleanly replaces
  // the old picture instead of accumulating orphan files.
  const filename = `${studentId}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, filename), buffer);
  return filename;
}

export async function readAvatarFile(filename: string): Promise<{ buffer: Buffer; contentType: string } | null> {
  const safeName = path.basename(filename);
  const ext = path.extname(safeName).slice(1).toLowerCase();
  const contentType = Object.entries(ALLOWED_TYPES).find(([, e]) => e === ext)?.[0];
  if (!contentType) return null;

  try {
    const buffer = await readFile(path.join(UPLOAD_DIR, safeName));
    return { buffer, contentType };
  } catch {
    return null;
  }
}
