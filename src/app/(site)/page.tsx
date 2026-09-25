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
import ScrollReveal from "@/components/ScrollReveal";

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
      <section className="relative flex min-h-[720px] items-center overflow-hidden text-white sm:min-h-[760px]">
        <SiteMedia url={images.hero} fallback={HeroSceneBg} className="hero-media absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_48%,transparent_0%,rgba(5,18,10,0.18)_42%,rgba(5,18,10,0.72)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#06130b]/[0.86] via-[#06130b]/[0.52] to-[#06130b]/[0.2]" />
        <div className="relative mx-auto w-full max-w-[1180px] px-6 pb-28 pt-40 sm:pb-32 sm:pt-44">
          <div className="max-w-[680px]">
            <div className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-accent">
              <span className="h-px w-10 bg-accent" />
              Hasil Panen Lokal
            </div>
            <h1 className="text-[clamp(2.5rem,5.8vw,5rem)] font-extrabold leading-[1.03] tracking-[-0.04em]">
              Hasil Pertanian Segar <em className="text-accent italic">dari Petani</em> untuk Anda
            </h1>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-8 text-white/85 sm:text-[1.12rem]">
              KWT_GOGREEN merupakan website pemasaran digital hasil pertanian Kelompok Wanita Tani yang
              membantu masyarakat menemukan produk pertanian segar, berkualitas, dan mudah dipesan melalui
              WhatsApp.
            </p>
            <div className="mt-9 flex flex-wrap gap-3.5">
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
          className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-[0.65rem] font-bold uppercase tracking-[0.28em] text-white/75"
        >
          Scroll
          <IconChevronDown className="size-[18px] animate-bounce" />
        </a>
        <div className="absolute -bottom-1 left-[-5%] h-14 w-[110%] rounded-[50%_50%_0_0/100%_100%_0_0] bg-bg sm:h-20" />
      </section>

      <div id="tentang-preview">
        <ScrollReveal>
        <AboutSection eyebrow="— Tentang Kami" mainImageUrl={images.about_main} accentImageUrl={images.about_accent} />
        </ScrollReveal>
      </div>

      {/* FEATURES */}
      <ScrollReveal>
      <section className="bg-primary-50 py-[clamp(3.4rem,7vw,6rem)]">
        <div className="mx-auto max-w-[1180px] px-6">
          <div className="mx-auto max-w-xl text-center">
            <div className="mb-2 font-bold text-accent-600">Mengapa KWT_GOGREEN</div>
            <h2 className="text-[clamp(1.7rem,3.2vw,2.4rem)] font-extrabold tracking-tight">
              Pilihan Tepat untuk Produk Pertanian Segar
            </h2>
          </div>
          <FeatureGrid features={HOME_FEATURES} />
        </div>
      </section>
      </ScrollReveal>

      {/* CATALOG */}
      <ScrollReveal>
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
      </ScrollReveal>

      {/* PROMO BANNER */}
      <ScrollReveal>
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
      </ScrollReveal>

      {/* CONTACT PREVIEW */}
      <ScrollReveal>
      <section className="py-[clamp(3.4rem,7vw,6rem)]">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-10 px-6 lg:grid-cols-2">
          <ContactInfo text="Siap memesan atau punya pertanyaan seputar produk kami? Isi formulir di samping atau hubungi kami langsung — tim Kelompok Wanita Tani akan segera merespons." />
          <MapCard imageUrl={images.map} mapQuery={mapQuery} />
        </div>
      </section>
      </ScrollReveal>
    </>
  );
}
