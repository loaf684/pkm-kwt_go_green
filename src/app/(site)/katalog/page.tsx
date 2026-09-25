import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import CatalogSection from "@/components/CatalogSection";
import { getPublicProducts, getCategories, getSiteImages } from "@/lib/db/queries";

export const metadata: Metadata = {
  title: "Katalog Produk",
};

export default async function KatalogPage({
  searchParams,
}: PageProps<"/katalog">) {
  const params = await searchParams;
  const kategori = typeof params.kategori === "string" ? params.kategori : undefined;
  const [products, categoryRows, images] = await Promise.all([
    getPublicProducts(),
    getCategories(),
    getSiteImages(),
  ]);
  const categories = categoryRows.map((c) => ({ id: c.id, name: c.name, slug: c.slug }));
  const initialCategory = kategori && categories.some((c) => c.slug === kategori) ? kategori : "semua";

  return (
    <>
      <PageBanner
        crumb="Katalog Produk"
        title="Katalog Produk Pertanian"
        text="Lihat produk, cek harga & stok, lalu pesan langsung melalui WhatsApp. Klik produk untuk melihat detail."
        bgUrl={images.page_banner}
      />

      <section className="py-[clamp(3.4rem,7vw,6rem)]">
        <div className="mx-auto max-w-[1180px] px-6">
          <CatalogSection products={products} categories={categories} initialCategory={initialCategory} />
        </div>
      </section>
    </>
  );
}
