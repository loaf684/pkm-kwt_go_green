export interface Feature {
  title: string;
  desc: string;
}

export const HOME_FEATURES: Feature[] = [
  { title: "Dipanen oleh anggota KWT", desc: "Sayur dan hasil kebun berasal dari kebun yang dikelola anggota kami." },
  { title: "Harga dan stok jelas", desc: "Cek harga serta jumlah yang tersedia sebelum memesan." },
  { title: "Pesan langsung", desc: "Pilih produk di katalog, lalu lanjutkan pesanan lewat WhatsApp." },
  { title: "Dukung usaha tani warga", desc: "Belanja dari KWT membantu usaha kebun anggota di lingkungan Griya Asri." },
];

export const ABOUT_FEATURES: Feature[] = [
  { title: "Hasil kebun anggota", desc: "Kami menanam dan merawat produk yang dijual di katalog." },
  { title: "Stok diperbarui", desc: "Ketersediaan produk bisa dilihat sebelum menghubungi kami." },
  { title: "Pemesanan mudah", desc: "Pesanan diteruskan langsung ke WhatsApp KWT." },
  { title: "Usaha bersama", desc: "Kegiatan kebun dikelola oleh anggota Kelompok Wanita Tani." },
];

export default function FeatureGrid({ features }: { features: Feature[] }) {
  return (
    <div className="mt-8 grid min-w-0 grid-cols-1 gap-x-12 md:grid-cols-2">
      {features.map((feature, index) => (
        <article key={feature.title} className="min-w-0 border-t border-primary/20 py-5 sm:py-6">
          <div className="flex items-baseline gap-4">
            <span className="font-display text-sm font-semibold tabular-nums text-accent-600">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-lg font-bold leading-snug sm:text-xl">{feature.title}</h3>
          </div>
          <p className="mt-2 pl-9 text-sm leading-6 text-muted sm:text-base">{feature.desc}</p>
        </article>
      ))}
    </div>
  );
}
