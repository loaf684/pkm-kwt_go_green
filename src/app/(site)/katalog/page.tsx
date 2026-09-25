import type { Metadata } from "next";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import CatalogSection from "@/components/CatalogSection";
import { WA_GENERAL_LINK } from "@/lib/products";
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

      <section className="pb-[clamp(3.4rem,7vw,6rem)]">
        <div className="mx-auto max-w-[1180px] px-6">
          <div className="rounded-[28px] border border-primary-100 bg-primary-50 px-6 py-12 text-center sm:px-12">
            <h2 className="text-[clamp(1.7rem,3.2vw,2.4rem)] font-extrabold tracking-tight">
              Tidak Menemukan yang Anda Cari?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-[1.05rem] text-muted">
              Hubungi kami via WhatsApp — beri tahu kebutuhan Anda dan tim Kelompok Mutiara Tani akan membantu
              menyiapkan produk yang tepat.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3.5">
              <Link
                href="/katalog"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-md"
              >
                Lihat Katalog
              </Link>
              <a
                href={WA_GENERAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-7 py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:bg-whatsapp-600 hover:shadow-md"
              >
                Hubungi WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
