export const WA_NUMBER = "6285883729767";

export function waLink(text: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

export const WA_GENERAL_TEXT =
  "Halo, saya ingin mengetahui lebih lanjut tentang produk dari Kelompok Wanita Tani.";

export const WA_GENERAL_LINK = waLink(WA_GENERAL_TEXT);

export type IconKey =
  | "corn"
  | "cornpale"
  | "chili"
  | "cucumber"
  | "bokchoy"
  | "eggplant"
  | "leaf";

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Product {
  id: string; // slug, used in URLs/keys
  dbId: number; // numeric id, needed to build the /api/products/[id]/image URL
  name: string;
  categorySlug: string;
  categoryLabel: string;
  stock: string;
  price: string;
  unit: string;
  desc: string;
  icon: IconKey;
  imageUrl: string | null;
  hasUploadedImage: boolean;
  imageVersion: number; // for cache-busting the served-image URL after edits
}

export function productImageSrc(p: Pick<Product, "dbId" | "imageUrl" | "hasUploadedImage" | "imageVersion">): string | null {
  if (p.imageUrl) return p.imageUrl;
  if (p.hasUploadedImage) return `/api/products/${p.dbId}/image?v=${p.imageVersion}`;
  return null;
}

export function productWaLink(name: string): string {
  return waLink(`Halo, saya ingin memesan produk ${name}. Apakah masih tersedia?`);
}
