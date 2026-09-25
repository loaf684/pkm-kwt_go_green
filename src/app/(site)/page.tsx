import { HeroSceneBg } from "@/components/illustrations";
import { IconChevronDown, IconWhatsApp } from "@/components/icons";
import { WA_GENERAL_LINK } from "@/lib/products";
import { getPublicProducts, getCategories, getSiteImages, getMapEmbedQuery } from "@/lib/db/queries";
import AboutSection from "@/components/AboutSection";
import FeatureGrid, { HOME_FEATURES } from "@/components/FeatureGrid";
import CatalogSection from "@/components/CatalogSection";
import ContactInfo from "@/components/ContactInfo";
import MapCard from "@/components/MapCard";
import SiteMedia from "@/components/SiteMedia";

// This page reads the product catalog from Postgres, so render it per
// request rather than freezing it at build time (when the DB may not be
// reachable, e.g. in this sandbox) — and so admin edits show up right away.
export const dynamic = "force-dynamic";

export default async function Home() {
  const [products, categories, images, mapQuery] = await Promise.all([
    getPublicProducts(),
    getCategories(),
    getSiteImages(),
    getMapEmbedQuery(),
  ]);

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[640px] items-center overflow-hidden text-white">
        <SiteMedia url={images.hero} fallback={HeroSceneBg} className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a160e]/[0.82] via-[#0a160e]/60 to-[#0a160e]/25" />
        <div className="relative mx-auto max-w-[1180px] px-6 py-24">
          <div className="max-w-[660px]">
            <h1 className="text-[clamp(2.1rem,4.6vw,3.4rem)] font-extrabold leading-tight tracking-tight">
              Hasil Pertanian Segar <em className="text-accent italic">dari Petani</em> untuk Anda
            </h1>
            <p className="mt-4 max-w-lg text-[1.08rem] text-white/90">
              SIPTANI–MUTIARA merupakan website pemasaran digital hasil pertanian Kelompok Mutiara Tani yang
              membantu masyarakat menemukan produk pertanian segar, berkualitas, dan mudah dipesan melalui
              WhatsApp.
            </p>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <a
                href="#katalog"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-bold text-primary-700 transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                Lihat Produk
              </a>
              <a
                href={WA_GENERAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-7 py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:bg-whatsapp-600 hover:shadow-lg"
              >
                <IconWhatsApp className="size-[19px]" />
                Pesan via WhatsApp
              </a>
            </div>
          </div>
        </div>
        <a
          href="#tentang-preview"
          className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-xs font-bold tracking-wide text-white/85"
        >
          Scroll
          <IconChevronDown className="size-[18px] animate-bounce" />
        </a>
      </section>

      <div id="tentang-preview">
        <AboutSection eyebrow="— Tentang Kami" mainImageUrl={images.about_main} accentImageUrl={images.about_accent} />
      </div>

      {/* FEATURES */}
      <section className="bg-primary-50 py-[clamp(3.4rem,7vw,6rem)]">
        <div className="mx-auto max-w-[1180px] px-6">
          <div className="mx-auto max-w-xl text-center">
            <div className="mb-2 font-bold text-accent-600">Mengapa SIPTANI–MUTIARA</div>
            <h2 className="text-[clamp(1.7rem,3.2vw,2.4rem)] font-extrabold tracking-tight">
              Pilihan Tepat untuk Produk Pertanian Segar
            </h2>
          </div>
          <FeatureGrid features={HOME_FEATURES} />
        </div>
      </section>

      {/* CATALOG */}
      <section id="katalog" className="py-[clamp(3.4rem,7vw,6rem)]">
        <div className="mx-auto max-w-[1180px] px-6">
          <div className="mb-8">
            <div className="mb-2 font-bold text-accent-600">Hasil Panen Pilihan</div>
            <h2 className="text-[clamp(1.7rem,3.2vw,2.4rem)] font-extrabold tracking-tight">
              Katalog Produk Pertanian
            </h2>
            <p className="mt-2.5 max-w-xl text-[1.05rem] text-muted">
              Lihat produk, cek harga &amp; stok, lalu pesan langsung melalui WhatsApp. Klik produk untuk melihat
              detail.
            </p>
          </div>
          <CatalogSection products={products} categories={categories.map((c) => ({ id: c.id, name: c.name, slug: c.slug }))} />
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="bg-primary py-[clamp(3.4rem,7vw,6rem)] text-white">
        <div className="mx-auto max-w-[1180px] px-6">
          <div className="max-w-xl">
            <div className="mb-2 font-bold text-accent">Promo Panen</div>
            <h2 className="text-[clamp(1.7rem,3.2vw,2.4rem)] font-extrabold tracking-tight text-white">
              Panen Segar Pekan Ini — Langsung dari Kebun
            </h2>
            <p className="mt-3 text-white/85">
              Stok sayuran dan tanaman pangan baru saja dipanen. Hubungi kami via WhatsApp untuk memastikan
              ketersediaan dan melakukan pemesanan.
            </p>
            <div className="mt-7 flex flex-wrap gap-3.5">
              <a
                href="#katalog"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-bold text-primary-700 transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                Lihat Produk
              </a>
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
        </div>
      </section>

      {/* CONTACT PREVIEW */}
      <section className="py-[clamp(3.4rem,7vw,6rem)]">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-10 px-6 lg:grid-cols-2">
          <ContactInfo text="Siap memesan atau punya pertanyaan seputar produk kami? Isi formulir di samping atau hubungi kami langsung — tim Kelompok Mutiara Tani akan segera merespons." />
          <MapCard imageUrl={images.map} mapQuery={mapQuery} />
        </div>
      </section>
    </>
  );
}
