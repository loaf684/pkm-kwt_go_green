import { asc, desc, eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { products, categories, inquiries, siteSettings, type ProductRow, type InquiryRow, type CategoryRow, type SiteSettingRow } from "@/lib/db/schema";
import type { Product } from "@/lib/products";
import { MAP_EMBED_KEY, type SiteImageMap } from "@/lib/site-images";

// Used only if the database can't be reached, so the public site still
// renders something instead of a blank catalog.
const FALLBACK_PRODUCTS: Product[] = [
  { id: "jagung-manis", dbId: 0, name: "Jagung Manis", categorySlug: "pangan", categoryLabel: "Tanaman Pangan", stock: "45 kg", price: "Rp15.000", unit: "/kg", icon: "corn", imageUrl: null, hasUploadedImage: false, imageVersion: 0, desc: "Jagung manis segar dengan rasa manis alami. Dipanen langsung dari kebun Kelompok Mutiara Tani sehingga kesegarannya terjaga dan siap diolah menjadi berbagai hidangan favorit keluarga." },
  { id: "cabai-merah", dbId: 0, name: "Cabai Merah", categorySlug: "sayuran", categoryLabel: "Sayuran", stock: "50 kg", price: "Rp30.000", unit: "/kg", icon: "chili", imageUrl: null, hasUploadedImage: false, imageVersion: 0, desc: "Cabai merah segar hasil panen petani lokal dengan kualitas terbaik. Warna merah merata, pedas alami, dan cocok untuk kebutuhan dapur rumahan maupun usaha kuliner." },
  { id: "jagung-pulut", dbId: 0, name: "Jagung Pulut", categorySlug: "pangan", categoryLabel: "Tanaman Pangan", stock: "45 kg", price: "Rp15.000", unit: "/kg", icon: "cornpale", imageUrl: null, hasUploadedImage: false, imageVersion: 0, desc: "Jagung pulut berkualitas dengan tekstur pulen, rasa gurih, dan cocok untuk berbagai olahan pangan tradisional seperti jagung rebus, bubur, maupun jajanan khas daerah." },
  { id: "mentimun", dbId: 0, name: "Mentimun", categorySlug: "sayuran", categoryLabel: "Sayuran", stock: "30 kg", price: "Rp8.000", unit: "/kg", icon: "cucumber", imageUrl: null, hasUploadedImage: false, imageVersion: 0, desc: "Mentimun segar cocok untuk lalapan dan olahan makanan. Renyah, berair, dan dipetik pada tingkat kematangan yang pas untuk menjaga kesegaran lebih lama." },
  { id: "sawi-hijau", dbId: 0, name: "Sawi Hijau", categorySlug: "sayuran", categoryLabel: "Sayuran", stock: "30 kg", price: "Rp7.000", unit: "/kg", icon: "bokchoy", imageUrl: null, hasUploadedImage: false, imageVersion: 0, desc: "Sawi hijau segar kaya nutrisi dan siap dipasarkan. Daun hijau segar dan batang renyah, ideal untuk tumisan, sup, maupun aneka masakan sehat sehari-hari." },
  { id: "terong-ungu", dbId: 0, name: "Terong Ungu", categorySlug: "sayuran", categoryLabel: "Sayuran", stock: "30 kg", price: "Rp10.000", unit: "/kg", icon: "eggplant", imageUrl: null, hasUploadedImage: false, imageVersion: 0, desc: "Terong ungu segar hasil budidaya kelompok tani. Bertekstur lembut saat dimasak dan cocok untuk balado, sambal terong, hingga aneka olahan panggang." },
];

const FALLBACK_CATEGORIES = [
  { id: 0, name: "Tanaman Pangan", slug: "pangan" },
  { id: 0, name: "Sayuran", slug: "sayuran" },
];

function formatRupiah(n: number): string {
  return `Rp${n.toLocaleString("id-ID")}`;
}

type ProductJoinRow = {
  product: ProductRow;
  category: CategoryRow | null;
};

function toDisplayProduct(row: ProductJoinRow): Product {
  const { product, category } = row;
  return {
    id: product.slug,
    dbId: product.id,
    name: product.name,
    categorySlug: category?.slug ?? "tanpa-kategori",
    categoryLabel: category?.name ?? "Tanpa Kategori",
    stock: `${product.stockKg} kg`,
    price: formatRupiah(product.priceRp),
    unit: "/kg",
    icon: product.icon,
    imageUrl: product.imageUrl,
    hasUploadedImage: Boolean(product.imageData),
    imageVersion: Math.floor(new Date(product.updatedAt).getTime() / 1000),
    desc: product.description,
  };
}

/** All categories, for filter tabs and the admin's category picker. */
export async function getCategories(): Promise<CategoryRow[]> {
  try {
    return await db.select().from(categories).orderBy(asc(categories.sortOrder), asc(categories.id));
  } catch (err) {
    console.error("getCategories: falling back —", (err as Error).message);
    return FALLBACK_CATEGORIES.map((c) => ({ ...c, sortOrder: 0, createdAt: new Date() }));
  }
}

/** Formatted products for the public site. Falls back to a bundled list on error. */
export async function getPublicProducts(): Promise<Product[]> {
  try {
    const rows = await db
      .select({ product: products, category: categories })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .orderBy(asc(products.sortOrder), asc(products.id));
    if (rows.length === 0) return FALLBACK_PRODUCTS;
    return rows.map(toDisplayProduct);
  } catch (err) {
    console.error("getPublicProducts: falling back to bundled list —", (err as Error).message);
    return FALLBACK_PRODUCTS;
  }
}

/** Raw rows (joined with category) for the admin list — no fallback, admin should see real errors. */
export async function getAdminProducts() {
  return db
    .select({ product: products, category: categories })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .orderBy(asc(products.sortOrder), asc(products.id));
}

export async function getProductById(id: number): Promise<ProductRow | undefined> {
  const rows = await db.select().from(products).where(eq(products.id, id)).limit(1);
  return rows[0];
}

/** Just the columns needed to serve the image — avoids selecting other large text columns unnecessarily. */
export async function getProductImage(id: number) {
  const rows = await db
    .select({ imageData: products.imageData, imageType: products.imageType })
    .from(products)
    .where(eq(products.id, id))
    .limit(1);
  return rows[0];
}

export async function getRecentInquiries(limit = 10): Promise<InquiryRow[]> {
  return db.select().from(inquiries).orderBy(desc(inquiries.createdAt)).limit(limit);
}

export async function countProductsInCategory(categoryId: number): Promise<number> {
  const rows = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(products)
    .where(eq(products.categoryId, categoryId));
  return rows[0]?.count ?? 0;
}

/** All configured site-image overrides, keyed by slot (see lib/site-images.ts). Empty on error. */
export async function getSiteImages(): Promise<SiteImageMap> {
  try {
    const rows = await db.select().from(siteSettings);
    const map: SiteImageMap = {};
    for (const row of rows) {
      if (row.value) {
        map[row.key] = row.value;
      } else if (row.imageData) {
        const v = Math.floor(new Date(row.updatedAt).getTime() / 1000);
        map[row.key] = `/api/site-images/${row.key}/image?v=${v}`;
      }
    }
    return map;
  } catch (err) {
    console.error("getSiteImages: returning no overrides —", (err as Error).message);
    return {};
  }
}

/** The raw stored row for one setting key — used by the admin form (to know upload vs. link) and the image-serving route. */
export async function getSiteSetting(key: string) {
  const rows = await db.select().from(siteSettings).where(eq(siteSettings.key, key)).limit(1);
  return rows[0];
}

/** The admin's configured "live Google Maps" address/place/link, if any. */
export async function getMapEmbedQuery(): Promise<string | undefined> {
  try {
    const row = await getSiteSetting(MAP_EMBED_KEY);
    return row?.value ?? undefined;
  } catch (err) {
    console.error("getMapEmbedQuery: returning none —", (err as Error).message);
    return undefined;
  }
}

/** All raw setting rows, keyed by key — used by the admin settings page to initialize each form. */
export async function getAllSiteSettings(): Promise<Record<string, SiteSettingRow>> {
  try {
    const rows = await db.select().from(siteSettings);
    const map: Record<string, SiteSettingRow> = {};
    for (const row of rows) map[row.key] = row;
    return map;
  } catch (err) {
    console.error("getAllSiteSettings: returning empty —", (err as Error).message);
    return {};
  }
}
