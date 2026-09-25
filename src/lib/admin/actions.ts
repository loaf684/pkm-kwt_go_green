"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { products, categories, inquiries, siteSettings, type ProductRow } from "@/lib/db/schema";
import { createSessionToken, SESSION_COOKIE } from "@/lib/admin/session";
import { checkAdminPassword } from "@/lib/admin/password";
import { countProductsInCategory, getSiteSetting } from "@/lib/db/queries";
import { MAP_EMBED_KEY } from "@/lib/site-images";
import type { IconKey } from "@/lib/products";

function revalidateProductPages() {
  revalidatePath("/");
  revalidatePath("/tentang");
  revalidatePath("/katalog");
  revalidatePath("/kontak");
  revalidatePath("/admin");
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ---------- Auth ----------

export type LoginState = { error?: string } | undefined;

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const password = String(formData.get("password") || "");
  const next = String(formData.get("next") || "/admin");

  let ok: boolean;
  try {
    ok = checkAdminPassword(password);
  } catch (err) {
    return { error: (err as Error).message };
  }

  if (!ok) {
    return { error: "Password salah." };
  }

  const token = await createSessionToken();
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days, matches the token's own expiry
  });

  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/admin/login");
}

export async function deleteInquiryAction(id: number) {
  await db.delete(inquiries).where(eq(inquiries.id, id));
  revalidatePath("/admin");
}

export async function clearInquiriesAction() {
  await db.delete(inquiries);
  revalidatePath("/admin");
}

// ---------- Categories ----------

export type CategoryFormState = { error?: string } | undefined;

export async function createCategoryAction(
  _prevState: CategoryFormState,
  formData: FormData
): Promise<CategoryFormState> {
  const name = String(formData.get("name") || "").trim();
  if (!name) return { error: "Nama kategori wajib diisi." };
  const slug = slugify(name);
  if (!slug) return { error: "Nama kategori tidak valid." };

  try {
    await db.insert(categories).values({ name, slug });
  } catch (err) {
    const message = (err as Error).message || "";
    if (message.includes("unique")) return { error: `Kategori "${name}" sudah ada.` };
    return { error: `Gagal menyimpan: ${message}` };
  }

  revalidatePath("/admin/categories");
  revalidateProductPages();
  redirect("/admin/categories");
}

export async function deleteCategoryAction(id: number): Promise<{ error?: string } | undefined> {
  const inUse = await countProductsInCategory(id);
  if (inUse > 0) {
    return {
      error: `Kategori ini masih dipakai oleh ${inUse} produk. Pindahkan produk tersebut ke kategori lain dulu, baru hapus kategorinya.`,
    };
  }
  await db.delete(categories).where(eq(categories.id, id));
  revalidatePath("/admin/categories");
  revalidateProductPages();
}

// ---------- Product CRUD ----------

export type ProductFormState = { error?: string } | undefined;

const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5MB — plenty for a web product photo

async function resolveCategoryId(formData: FormData): Promise<number> {
  const raw = String(formData.get("categoryId") || "");

  if (raw === "__new__") {
    const newName = String(formData.get("newCategoryName") || "").trim();
    if (!newName) throw new Error("Nama kategori baru wajib diisi.");
    const slug = slugify(newName);
    if (!slug) throw new Error("Nama kategori baru tidak valid.");
    const [row] = await db
      .insert(categories)
      .values({ name: newName, slug })
      .onConflictDoUpdate({ target: categories.slug, set: { name: newName } })
      .returning();
    return row.id;
  }

  const id = Number(raw);
  if (!Number.isFinite(id)) throw new Error("Kategori wajib dipilih.");
  return id;
}

interface ImageFields {
  imageUrl: string | null;
  imageData: string | null;
  imageType: string | null;
}

/**
 * Exactly one of "upload a file" / "paste a link" / "remove the image" wins,
 * in that order. If none of the three were touched (e.g. editing other
 * fields on a product that already has an image), the existing image is
 * left completely alone.
 */
async function resolveImageFields(formData: FormData, existing?: ProductRow): Promise<ImageFields> {
  const removeImage = formData.get("removeImage") === "on";
  const file = formData.get("imageFile");
  const urlInput = String(formData.get("imageUrl") || "").trim();

  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_IMAGE_BYTES) throw new Error("Ukuran gambar maksimal 5MB.");
    if (!file.type.startsWith("image/")) throw new Error("File yang diunggah harus berupa gambar.");
    const buffer = Buffer.from(await file.arrayBuffer());
    return { imageUrl: null, imageData: buffer.toString("base64"), imageType: file.type };
  }

  if (urlInput) {
    try {
      new URL(urlInput);
    } catch {
      throw new Error("Link gambar tidak valid — pastikan diawali https://");
    }
    return { imageUrl: urlInput, imageData: null, imageType: null };
  }

  if (removeImage) {
    return { imageUrl: null, imageData: null, imageType: null };
  }

  if (existing) {
    return { imageUrl: existing.imageUrl, imageData: existing.imageData, imageType: existing.imageType };
  }

  return { imageUrl: null, imageData: null, imageType: null };
}

async function parseProductForm(formData: FormData, existing?: ProductRow) {
  const name = String(formData.get("name") || "").trim();
  const slugInput = String(formData.get("slug") || "").trim();
  const slug = slugify(slugInput || name);
  const stockKg = Number(formData.get("stockKg"));
  const priceInput = String(formData.get("priceRp") || "");
  const priceRp = /^\d+(?:\.\d{3})*$/.test(priceInput)
    ? Number(priceInput.replace(/\./g, ""))
    : Number.NaN;
  const description = String(formData.get("description") || "").trim();
  const sortOrder = Number(formData.get("sortOrder") || 0);

  if (!name) throw new Error("Nama produk wajib diisi.");
  if (!slug) throw new Error("Slug tidak valid — gunakan huruf, angka, dan tanda hubung.");
  if (!Number.isFinite(stockKg) || stockKg < 0) throw new Error("Stok harus berupa angka 0 atau lebih.");
  if (!Number.isFinite(priceRp) || priceRp < 0) throw new Error("Harga harus berupa angka 0 atau lebih.");

  const categoryId = await resolveCategoryId(formData);
  const imageFields = await resolveImageFields(formData, existing);

  return {
    name,
    slug,
    categoryId,
    stockKg: Math.round(stockKg),
    priceRp: Math.round(priceRp),
    description,
    // Icon is a legacy fallback only, never edited from the form anymore:
    // existing products keep theirs, new products just default to "leaf".
    icon: (existing?.icon ?? "leaf") as IconKey,
    sortOrder: Number.isFinite(sortOrder) ? Math.round(sortOrder) : 0,
    ...imageFields,
  };
}

export async function createProductAction(
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  let data;
  try {
    data = await parseProductForm(formData);
  } catch (err) {
    return { error: (err as Error).message };
  }

  try {
    await db.insert(products).values(data);
  } catch (err) {
    const message = (err as Error).message || "";
    if (message.includes("unique")) {
      return { error: `Slug "${data.slug}" sudah dipakai produk lain — coba slug lain.` };
    }
    return { error: `Gagal menyimpan: ${message}` };
  }

  revalidateProductPages();
  redirect("/admin");
}

export async function updateProductAction(
  id: number,
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  const existingRows = await db.select().from(products).where(eq(products.id, id)).limit(1);
  const existing = existingRows[0];
  if (!existing) return { error: "Produk tidak ditemukan." };

  let data;
  try {
    data = await parseProductForm(formData, existing);
  } catch (err) {
    return { error: (err as Error).message };
  }

  try {
    await db
      .update(products)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(products.id, id));
  } catch (err) {
    const message = (err as Error).message || "";
    if (message.includes("unique")) {
      return { error: `Slug "${data.slug}" sudah dipakai produk lain — coba slug lain.` };
    }
    return { error: `Gagal menyimpan: ${message}` };
  }

  revalidateProductPages();
  redirect("/admin");
}

export async function deleteProductAction(id: number) {
  await db.delete(products).where(eq(products.id, id));
  revalidateProductPages();
}

// ---------- Site-wide image settings ----------

export type SiteImageFormState = { error?: string } | undefined;

export async function updateSiteImageAction(
  key: string,
  _prevState: SiteImageFormState,
  formData: FormData
): Promise<SiteImageFormState> {
  const removeImage = formData.get("removeImage") === "on";
  const file = formData.get("imageFile");
  const urlInput = String(formData.get("url") || "").trim();

  let value: string | null = null;
  let imageData: string | null = null;
  let imageType: string | null = null;

  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_IMAGE_BYTES) return { error: "Ukuran gambar maksimal 5MB." };
    if (!file.type.startsWith("image/")) return { error: "File yang diunggah harus berupa gambar." };
    imageData = Buffer.from(await file.arrayBuffer()).toString("base64");
    imageType = file.type;
  } else if (urlInput) {
    try {
      new URL(urlInput);
    } catch {
      return { error: "Link tidak valid — pastikan diawali https://" };
    }
    value = urlInput;
  } else if (!removeImage) {
    // Nothing new submitted — keep whatever is already stored for this slot.
    const existing = await getSiteSetting(key);
    if (existing) {
      value = existing.value;
      imageData = existing.imageData;
      imageType = existing.imageType;
    }
  }
  // else: removeImage was checked and nothing new was given — all three stay null, reverting to the illustration.

  await db
    .insert(siteSettings)
    .values({ key, value, imageData, imageType, updatedAt: new Date() })
    .onConflictDoUpdate({ target: siteSettings.key, set: { value, imageData, imageType, updatedAt: new Date() } });

  revalidateProductPages();
  redirect("/admin/settings");
}

// ---------- Live Google Maps embed ----------

export type MapEmbedFormState = { error?: string } | undefined;

export async function updateMapEmbedAction(
  _prevState: MapEmbedFormState,
  formData: FormData
): Promise<MapEmbedFormState> {
  const query = String(formData.get("query") || "").trim();

  await db
    .insert(siteSettings)
    .values({ key: MAP_EMBED_KEY, value: query || null, updatedAt: new Date() })
    .onConflictDoUpdate({ target: siteSettings.key, set: { value: query || null, updatedAt: new Date() } });

  revalidateProductPages();
  redirect("/admin/settings");
}
