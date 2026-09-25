"use client";

import { useActionState, useMemo, useState, type ChangeEvent } from "react";
import type { ProductFormState } from "@/lib/admin/actions";
import type { ProductRow } from "@/lib/db/schema";
import type { Category } from "@/lib/products";
import { PRODUCT_ICONS } from "@/components/illustrations";

function existingImageSrc(product?: ProductRow): string | null {
  if (!product) return null;
  if (product.imageUrl) return product.imageUrl;
  if (product.imageData) {
    const v = Math.floor(new Date(product.updatedAt).getTime() / 1000);
    return `/api/products/${product.id}/image?v=${v}`;
  }
  return null;
}

export default function ProductForm({
  action,
  product,
  categories,
}: {
  action: (state: ProductFormState, formData: FormData) => Promise<ProductFormState>;
  product?: ProductRow;
  categories: Category[];
}) {
  const [state, formAction, pending] = useActionState(action, undefined);

  const [categoryChoice, setCategoryChoice] = useState<string>(
    product ? String(product.categoryId) : (categories[0] ? String(categories[0].id) : "__new__")
  );

  const [imageMode, setImageMode] = useState<"upload" | "link">(
    product?.imageUrl ? "link" : "upload"
  );
  const [removeImage, setRemoveImage] = useState(false);
  const [linkValue, setLinkValue] = useState(product?.imageUrl ?? "");
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [linkPreviewOk, setLinkPreviewOk] = useState(true);

  const currentImageSrc = useMemo(() => existingImageSrc(product), [product]);
  const FallbackIcon = PRODUCT_ICONS[product?.icon ?? "leaf"];

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setUploadPreview(URL.createObjectURL(file));
      setRemoveImage(false);
    } else {
      setUploadPreview(null);
    }
  }

  // What the preview box should actually show, in priority order.
  const previewSrc = removeImage
    ? null
    : imageMode === "upload"
      ? uploadPreview ?? currentImageSrc
      : linkValue.trim()
        ? linkValue.trim()
        : currentImageSrc;

  return (
    <form action={formAction} className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_280px] md:gap-8">
      <div className="flex flex-col gap-6 rounded-[24px] border border-border bg-white p-5 sm:rounded-[28px] sm:p-8">
        <div className="flex flex-col gap-4">
          <div className="text-xs font-bold uppercase tracking-wide text-muted">Informasi Dasar</div>
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-bold">Nama Produk</label>
            <input
              id="name"
              name="name"
              defaultValue={product?.name}
              required
              placeholder="Contoh: Tomat Merah"
              className="w-full rounded-[10px] border border-border bg-bg px-3.5 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
          </div>

          <div>
            <label htmlFor="slug" className="mb-1.5 block text-sm font-bold">
              Slug <span className="font-normal text-muted">(kosongkan untuk membuat otomatis dari nama)</span>
            </label>
            <input
              id="slug"
              name="slug"
              defaultValue={product?.slug}
              placeholder="tomat-merah"
              className="w-full rounded-[10px] border border-border bg-bg px-3.5 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
          </div>

          <div>
            <label htmlFor="categoryId" className="mb-1.5 block text-sm font-bold">Kategori</label>
            <select
              id="categoryId"
              name="categoryId"
              value={categoryChoice}
              onChange={(e) => setCategoryChoice(e.target.value)}
              className="w-full rounded-[10px] border border-border bg-bg px-3.5 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
              <option value="__new__">+ Buat kategori baru…</option>
            </select>
            {categoryChoice === "__new__" && (
              <input
                name="newCategoryName"
                placeholder="Nama kategori baru, contoh: Buah-buahan"
                required
                className="mt-2 w-full rounded-[10px] border border-primary bg-bg px-3.5 py-3 outline-none"
              />
            )}
            {categories.length === 0 && categoryChoice !== "__new__" && (
              <p className="mt-1.5 text-xs text-muted">Belum ada kategori — pilih &ldquo;Buat kategori baru&rdquo; di atas.</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-border pt-6">
          <div className="text-xs font-bold uppercase tracking-wide text-muted">Stok &amp; Harga</div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="stockKg" className="mb-1.5 block text-sm font-bold">Stok (kg)</label>
              <input
                id="stockKg"
                name="stockKg"
                type="number"
                min={0}
                step={1}
                defaultValue={product?.stockKg ?? 0}
                required
                className="w-full rounded-[10px] border border-border bg-bg px-3.5 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </div>
            <div>
              <label htmlFor="priceRp" className="mb-1.5 block text-sm font-bold">Harga (Rp / kg)</label>
              <input
                id="priceRp"
                name="priceRp"
                type="number"
                min={0}
                step={500}
                defaultValue={product?.priceRp ?? 0}
                required
                className="w-full rounded-[10px] border border-border bg-bg px-3.5 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-border pt-6">
          <div className="text-xs font-bold uppercase tracking-wide text-muted">Detail Tampilan</div>
          <div>
            <label htmlFor="description" className="mb-1.5 block text-sm font-bold">Deskripsi</label>
            <textarea
              id="description"
              name="description"
              defaultValue={product?.description}
              rows={4}
              placeholder="Deskripsi singkat produk untuk ditampilkan di katalog"
              className="w-full resize-y rounded-[10px] border border-border bg-bg px-3.5 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
          </div>

          <div>
            <label htmlFor="sortOrder" className="mb-1.5 block text-sm font-bold">
              Urutan Tampil <span className="font-normal text-muted">(angka kecil tampil lebih dulu)</span>
            </label>
            <input
              id="sortOrder"
              name="sortOrder"
              type="number"
              step={1}
              defaultValue={product?.sortOrder ?? 0}
              className="w-full max-w-[160px] rounded-[10px] border border-border bg-bg px-3.5 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
          </div>
        </div>

        {/* ---------- Image ---------- */}
        <div className="border-t border-border pt-6">
          <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-muted">Foto Produk</span>
          <div className="mb-3 inline-flex rounded-full border border-border bg-bg p-1">
            <button
              type="button"
              onClick={() => setImageMode("upload")}
              className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${
                imageMode === "upload" ? "bg-primary text-white" : "text-muted"
              }`}
            >
              Upload File
            </button>
            <button
              type="button"
              onClick={() => setImageMode("link")}
              className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${
                imageMode === "link" ? "bg-primary text-white" : "text-muted"
              }`}
            >
              Link Gambar
            </button>
          </div>

          {imageMode === "upload" ? (
            <input
              key="upload"
              type="file"
              name="imageFile"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-muted file:mr-3 file:rounded-full file:border-0 file:bg-primary-50 file:px-4 file:py-2 file:font-bold file:text-primary hover:file:bg-primary-100"
            />
          ) : (
            <input
              key="link"
              type="text"
              name="imageUrl"
              value={linkValue}
              onChange={(e) => {
                setLinkValue(e.target.value);
                setLinkPreviewOk(true);
                setRemoveImage(false);
              }}
              placeholder="https://contoh.com/gambar-produk.jpg"
              className="w-full rounded-[10px] border border-border bg-bg px-3.5 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
          )}
          <p className="mt-1.5 text-xs text-muted">
            Gunakan salah satu: unggah file (maks. 5MB) atau tempel link gambar. Kosongkan keduanya untuk
            membiarkan foto yang sudah ada (jika sedang mengubah produk).
          </p>

          {currentImageSrc && (
            <label className="mt-3 flex items-center gap-2 text-sm font-semibold text-red-600">
              <input
                type="checkbox"
                name="removeImage"
                checked={removeImage}
                onChange={(e) => setRemoveImage(e.target.checked)}
              />
              Hapus foto saat ini (kembali ke ikon bawaan)
            </label>
          )}
        </div>

        {state?.error && (
          <p className="rounded-lg bg-red-50 px-3.5 py-2.5 text-sm font-semibold text-red-600">{state.error}</p>
        )}

        <div className="mt-1 hidden items-center gap-3 sm:flex">
          <button
            type="submit"
            disabled={pending}
            className="rounded-full bg-primary px-6 py-3 font-bold text-white transition hover:bg-primary-600 disabled:opacity-70"
          >
            {pending ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </div>

      <div className="flex h-fit flex-col items-center gap-3 rounded-[24px] border border-border bg-white p-6 text-center sm:sticky sm:top-20 sm:rounded-[28px]">
        <span className="text-xs font-bold uppercase tracking-wide text-muted">Pratinjau</span>
        <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl bg-primary-50">
          {previewSrc && linkPreviewOk ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={previewSrc}
              alt="Pratinjau produk"
              className="size-full object-cover"
              onError={() => setLinkPreviewOk(false)}
            />
          ) : (
            <FallbackIcon className="h-[72%] w-[72%]" />
          )}
        </div>
        <p className="text-xs text-muted">
          {previewSrc && linkPreviewOk
            ? "Ini yang akan tampil di katalog."
            : "Belum ada foto — ikon bawaan akan tampil sebagai gantinya."}
        </p>
      </div>

      {/* Mobile: sticky save bar so the submit button is always reachable */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-white/95 p-3 pb-[calc(env(safe-area-inset-bottom,0px)+0.75rem)] backdrop-blur sm:hidden">
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-full bg-primary py-3.5 font-bold text-white transition hover:bg-primary-600 disabled:opacity-70"
        >
          {pending ? "Menyimpan..." : "Simpan Produk"}
        </button>
      </div>
      {/* Spacer so content isn't hidden behind the fixed mobile save bar */}
      <div className="h-16 sm:hidden" aria-hidden />
    </form>
  );
}
