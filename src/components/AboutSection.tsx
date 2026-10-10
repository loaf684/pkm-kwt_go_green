import Link from "next/link";
import { BasketIllustration, FarmerIllustration } from "@/components/illustrations";
import Checklist from "@/components/Checklist";
import SiteMedia from "@/components/SiteMedia";

const CHECKLIST_ITEMS = [
  "Pilih sayur atau tanaman pangan di katalog",
  "Cek harga dan stok yang tersedia",
  "Tentukan jumlah yang ingin dipesan",
  "Kirim pesanan langsung lewat WhatsApp",
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
            <div className="absolute left-[5%] top-[5%] h-[78%] w-[68%] -rotate-2 overflow-hidden rounded-[28px] bg-primary-50 shadow-[0_18px_36px_rgba(24,32,25,0.14)]">
              <SiteMedia url={mainImageUrl} fallback={FarmerIllustration} className="size-full object-cover" />
            </div>
            <div className="absolute bottom-[3%] right-[3%] h-[58%] w-[47%] rotate-3 overflow-hidden rounded-[24px] border-4 border-white bg-primary-50 shadow-[0_16px_30px_rgba(24,32,25,0.16)]">
              <SiteMedia url={accentImageUrl} fallback={BasketIllustration} className="size-full object-cover" />
            </div>
          </div>
          <p className="mt-3 text-sm text-muted">Kebun KWT Go Green Griya Asri</p>
        </div>

        <div>
          <div className="mb-2 text-sm font-semibold text-primary">{eyebrow}</div>
          <h2 className="text-[clamp(1.7rem,3.2vw,2.4rem)] font-extrabold leading-tight tracking-tight">
            Mendukung Petani,
            <span className="block text-[#4b8b55]">Mendekatkan Hasil Tani</span>
          </h2>
          <p className="mt-4 text-[1.05rem] text-muted">
            Kami adalah Kelompok Wanita Tani di Griya Asri. Bersama-sama, kami menanam dan merawat sayuran serta
            tanaman pangan di kebun.
          </p>
          <p className="mt-3.5 text-[1.05rem] text-muted">
            Hasil panen dan jumlah yang tersedia bisa berubah. Cek katalog untuk melihat stok dan harga terbaru, lalu
            pesan lewat WhatsApp. Jika ada yang ingin ditanyakan, kami siap membantu.
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
