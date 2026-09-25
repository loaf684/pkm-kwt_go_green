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
          <div className="relative aspect-[1.1]">
            <div className="absolute left-[8%] top-[5%] h-[78%] w-[66%] -rotate-3 overflow-hidden rounded-[42px_42px_42px_12px] bg-primary-50 shadow-[0_25px_48px_rgba(24,32,25,0.18)]">
              <SiteMedia url={mainImageUrl} fallback={FarmerIllustration} className="size-full object-cover" />
            </div>
            <div className="absolute bottom-[3%] right-[4%] h-[61%] w-[48%] rotate-6 overflow-hidden rounded-[18px_42px_42px_42px] border-[7px] border-white bg-primary-50 shadow-[0_20px_38px_rgba(24,32,25,0.2)]">
              <SiteMedia url={accentImageUrl} fallback={BasketIllustration} className="size-full object-cover" />
            </div>
            <div className="absolute left-[10%] bottom-[8%] h-2 w-28 rounded-full bg-accent/75" />
            <div className="absolute right-[4%] top-[1%] size-20 rounded-full border border-primary-100 bg-primary-50/70" />
          </div>
          <div className="absolute left-1/2 top-1/2 z-10 flex size-[94px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#10261a] text-accent shadow-[0_14px_28px_rgba(16,38,26,0.3)] sm:size-[116px]">
            <svg viewBox="0 0 160 160" className="size-full" aria-label="KWT_GOGREEN — Pertanian Kelompok Wanita Tani">
              <defs>
                <path id="about-badge-circle" d="M80,80 m-58,0 a58,58 0 1,1 116,0 a58,58 0 1,1 -116,0" />
              </defs>
              <g className="about-badge-text">
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  from="0 80 80"
                  to="360 80 80"
                  dur="18s"
                  repeatCount="indefinite"
                />
                <text className="fill-current text-[10px] font-bold uppercase tracking-[1.8px]">
                  <textPath href="#about-badge-circle">
                    KELOMPOK WANITA TANI • KELOMPOK WANITA TANI •
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
            KWT_GOGREEN adalah media pemasaran digital yang membantu memperkenalkan produk Kelompok Wanita Tani,
            memperluas jangkauan pasar, dan meningkatkan kesejahteraan petani.
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
