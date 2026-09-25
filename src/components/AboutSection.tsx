import Link from "next/link";
import { BasketIllustration, FarmerIllustration } from "@/components/illustrations";
import Checklist from "@/components/Checklist";
import SiteMedia from "@/components/SiteMedia";

const CHECKLIST_ITEMS = [
  "Hasil panen segar",
  "Harga & stok transparan",
  "Pemesanan via WhatsApp",
  "Mendukung petani lokal",
];

export default function AboutSection({
  eyebrow,
  showCatalogButton = false,
  mainImageUrl,
  accentImageUrl,
}: {
  eyebrow: string;
  showCatalogButton?: boolean;
  mainImageUrl?: string;
  accentImageUrl?: string;
}) {
  return (
    <section className="py-[clamp(3.4rem,7vw,6rem)]">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-10 px-6 lg:grid-cols-[0.85fr_1fr] lg:gap-14">
        <div className="relative order-first mx-auto w-full max-w-[560px] px-0 py-4 lg:order-none lg:max-w-none">
          <div className="relative grid aspect-[1.18] grid-cols-2 gap-0 overflow-visible">
            <div className="overflow-hidden rounded-[34px_0_0_34px] bg-primary-50 shadow-[0_18px_40px_rgba(24,32,25,0.14)]">
              <SiteMedia url={accentImageUrl} fallback={BasketIllustration} className="size-full object-cover" />
            </div>
            <div className="overflow-hidden rounded-[0_34px_34px_0] bg-primary-50 shadow-[0_18px_40px_rgba(24,32,25,0.14)]">
              <SiteMedia url={mainImageUrl} fallback={FarmerIllustration} className="size-full object-cover" />
            </div>
          </div>
          <div className="absolute left-1/2 top-1/2 z-10 flex size-[94px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#10261a] text-accent shadow-[0_14px_28px_rgba(16,38,26,0.3)] sm:size-[116px]">
            <svg viewBox="0 0 160 160" className="size-full" aria-label="KWT_GOGREEN — Pertanian Kelompok Wanita Tani">
              <defs>
                <path id="about-badge-circle" d="M80,80 m-58,0 a58,58 0 1,1 116,0 a58,58 0 1,1 -116,0" />
              </defs>
              <g className="about-badge-text" style={{ transformOrigin: "80px 80px" }}>
                <text className="fill-current text-[10px] font-bold uppercase tracking-[1.8px]">
                  <textPath href="#about-badge-circle">
                    KWT_GOGREEN • PERTANIAN • KELOMPOK WANITA TANI •
                  </textPath>
                </text>
              </g>
              <path d="M80 98c-8-12-7-24 0-35 7 11 8 23 0 35Z" fill="#71e39a" />
              <path d="M80 98V72" fill="none" stroke="#71e39a" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <div>
          <div className="mb-4 text-[0.8rem] font-bold tracking-wide text-muted">
            KELOMPOK WANITA TANI • PERTANIAN LOKAL •
          </div>
          <div className="mb-2 font-bold text-accent-600">{eyebrow}</div>
          <h2 className="text-[clamp(1.7rem,3.2vw,2.4rem)] font-extrabold leading-tight tracking-tight">
            Mendukung Petani, Mendekatkan Hasil Tani
          </h2>
          <p className="mt-4 text-[1.05rem] text-muted">
            KWT_GOGREEN merupakan website pemasaran digital hasil pertanian yang membantu mempromosikan
            produk Kelompok Wanita Tani, memperluas jangkauan pasar, dan meningkatkan pendapatan petani.
          </p>
          <p className="mt-3.5 text-[1.05rem] text-muted">
            Melalui katalog yang mudah diakses, konsumen dapat melihat produk, membaca detail, serta memesan
            langsung melalui WhatsApp — tanpa perantara dan tanpa biaya tersembunyi.
          </p>
          <Checklist items={CHECKLIST_ITEMS} />
          {showCatalogButton && (
            <div className="mt-7">
              <Link
                href="/katalog"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-md"
              >
                Lihat Katalog Produk
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
