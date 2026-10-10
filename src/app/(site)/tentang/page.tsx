import type { Metadata } from "next";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import AboutSection from "@/components/AboutSection";
import FeatureGrid, { ABOUT_FEATURES } from "@/components/FeatureGrid";
import Checklist from "@/components/Checklist";
import { FieldRowsIllustration } from "@/components/illustrations";
import SiteMedia from "@/components/SiteMedia";
import { WA_GENERAL_LINK } from "@/lib/products";
import { getSiteImages } from "@/lib/db/queries";

export const metadata: Metadata = {
  title: "Tentang Kami",
};

const VISION_ITEMS = [
  "Mengutamakan kesegaran dan mutu produk",
  "Memberdayakan dan menyejahterakan petani lokal",
  "Menjaga keterbukaan harga dan ketersediaan stok",
  "Melayani pemesanan dengan cepat dan ramah",
];

export default async function TentangPage() {
  const images = await getSiteImages();

  return (
    <>
      <PageBanner
        crumb="Tentang Kami"
        title="Tentang Kelompok Wanita Tani"
        text="Kami adalah kelompok wanita tani di Griya Asri. Lihat hasil kebun kami dan hubungi kami jika ingin memesan."
        bgUrl={images.page_banner}
      />

      <AboutSection
        eyebrow="Profil Kami"
        showCatalogButton
        mainImageUrl={images.about_main}
        accentImageUrl={images.about_accent}
      />

      <section className="bg-primary-50 py-[clamp(3.4rem,7vw,6rem)]">
        <div className="mx-auto max-w-[1180px] px-6">
          <div className="mx-auto max-w-xl text-center">
            <div className="mb-2 font-bold text-accent-600">Keunggulan Kami</div>
            <h2 className="text-[clamp(1.7rem,3.2vw,2.4rem)] font-extrabold tracking-tight">
              Mengapa Memilih Produk Kami
            </h2>
          </div>
          <FeatureGrid features={ABOUT_FEATURES} />
        </div>
      </section>

      <section className="py-[clamp(3.4rem,7vw,6rem)]">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-10 px-6 lg:grid-cols-2 lg:gap-14">
          <div>
            <div className="mb-2 font-bold text-accent-600">Visi dan Komitmen</div>
            <h2 className="text-[clamp(1.7rem,3.2vw,2.4rem)] font-extrabold leading-tight tracking-tight">
              Hasil Kebun untuk Hari Esok
            </h2>
            <p className="mt-4 text-[1.05rem] text-muted">
              Kami ingin hasil kebun anggota KWT dikenal lebih luas dan mudah dibeli. Kami juga berupaya menjaga
              mutu produk dan mendukung para petani.
            </p>
            <Checklist items={VISION_ITEMS} columns={1} />
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-[28px] shadow-2xl">
            <SiteMedia url={images.vision} fallback={FieldRowsIllustration} className="size-full object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-primary py-[clamp(3.4rem,7vw,6rem)] text-white">
        <div className="mx-auto max-w-xl px-6 text-center">
          <h2 className="text-[clamp(1.7rem,3.2vw,2.4rem)] font-extrabold tracking-tight text-white">
            Mari Dukung Petani Lokal Bersama Kami
          </h2>
          <p className="mt-3 text-white/85">
            Lihat produk yang tersedia di katalog, lalu pesan lewat WhatsApp.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3.5">
            <Link
              href="/katalog"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-bold text-primary-700 transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Lihat Katalog
            </Link>
            <a
              href={WA_GENERAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-7 py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:bg-whatsapp-600 hover:shadow-lg"
            >
              Hubungi WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
