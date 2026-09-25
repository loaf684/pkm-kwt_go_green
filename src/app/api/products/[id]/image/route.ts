import { NextResponse } from "next/server";
import { getProductImage } from "@/lib/db/queries";

export async function GET(
  _request: Request,
  { params }: RouteContext<"/api/products/[id]/image">
) {
  const { id } = await params;
  const productId = Number(id);
  if (!Number.isFinite(productId)) {
    return new NextResponse(null, { status: 404 });
  }

  const row = await getProductImage(productId);
  if (!row?.imageData || !row.imageType) {
    return new NextResponse(null, { status: 404 });
  }

  const bytes = Buffer.from(row.imageData, "base64");
  return new NextResponse(bytes, {
    headers: {
      "Content-Type": row.imageType,
      // The URL includes ?v=<updatedAt> from productImageSrc(), so it's safe
      // to cache aggressively — a new upload gets a new URL automatically.
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
