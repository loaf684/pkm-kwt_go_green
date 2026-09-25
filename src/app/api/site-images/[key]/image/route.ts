import { NextResponse } from "next/server";
import { getSiteSetting } from "@/lib/db/queries";

export async function GET(
  _request: Request,
  { params }: RouteContext<"/api/site-images/[key]/image">
) {
  const { key } = await params;
  const row = await getSiteSetting(key);

  if (!row?.imageData || !row.imageType) {
    return new NextResponse(null, { status: 404 });
  }

  const bytes = Buffer.from(row.imageData, "base64");
  return new NextResponse(bytes, {
    headers: {
      "Content-Type": row.imageType,
      // The URL includes ?v=<updatedAt>, so a new upload gets a new URL —
      // safe to cache aggressively.
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
