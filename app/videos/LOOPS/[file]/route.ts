import { createReadStream, statSync } from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";

const videoDirectory = path.join(process.cwd(), "public", "Videos", "LOOPS");
const allowedFiles = new Set([
  "AB REEL LOOP.mp4",
  "DHAWK REEL LOOP.mp4",
  "LA Volonte Loop.mp4",
]);

function streamResponse(
  filePath: string,
  start: number,
  end: number,
  fileSize: number,
  status: 200 | 206,
) {
  const stream = createReadStream(filePath, { start, end });
  const headers = new Headers({
    "Accept-Ranges": "bytes",
    "Content-Length": String(end - start + 1),
    "Content-Type": "video/mp4",
    "Cache-Control": "public, max-age=31536000, immutable",
  });

  if (status === 206) {
    headers.set("Content-Range", `bytes ${start}-${end}/${fileSize}`);
  }

  return new Response(Readable.toWeb(stream) as BodyInit, {
    status,
    headers,
  });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ file: string }> },
) {
  const { file } = await params;

  if (!allowedFiles.has(file)) {
    return new Response("Not found", { status: 404 });
  }

  const filePath = path.join(videoDirectory, file);
  const { size } = statSync(filePath);
  const range = request.headers.get("range");

  if (!range) {
    return streamResponse(filePath, 0, size - 1, size, 200);
  }

  const match = range.match(/bytes=(\d*)-(\d*)/);

  if (!match) {
    return new Response("Invalid range", { status: 416 });
  }

  const start = match[1] ? Number(match[1]) : 0;
  const end = match[2] ? Number(match[2]) : size - 1;

  if (start >= size || end >= size || start > end) {
    return new Response("Requested range not satisfiable", {
      status: 416,
      headers: {
        "Content-Range": `bytes */${size}`,
      },
    });
  }

  return streamResponse(filePath, start, end, size, 206);
}
