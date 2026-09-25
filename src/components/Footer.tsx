import Link from "next/link";
import { IconWhatsApp } from "@/components/icons";
import { WA_GENERAL_LINK } from "@/lib/products";
import { getCategories } from "@/lib/db/queries";

export default async function Footer() {
  const categories = (await getCategories()).slice(0, 6);

  return (
    <footer className="bg-primary-700 pb-6 pt-16 text-white/80">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <strong className="block text-[1.15rem] font-extrabold text-white">kwt_gogreen</strong>
            <span className="mb-3.5 mt-1 block text-sm font-bold text-accent">Kelompok Wanita Tani</span>
            <p className="max-w-xs text-sm text-white/65">
              Media pemasaran digital hasil pertanian Kelompok Wanita Tani untuk mempermudah akses konsumen
              terhadap produk segar dan berkualitas.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-white">Navigasi</h4>
            <div className="flex flex-col gap-2.5 text-sm">
              <Link href="/" className="text-white/68 hover:text-white">Beranda</Link>
              <Link href="/tentang" className="text-white/68 hover:text-white">Tentang Kami</Link>
              <Link href="/katalog" className="text-white/68 hover:text-white">Katalog Produk</Link>
              <Link href="/kontak" className="text-white/68 hover:text-white">Kontak</Link>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-white">Produk</h4>
            <div className="flex flex-col gap-2.5 text-sm">
              {categories.map((c) => (
                <Link key={c.slug} href={`/katalog?kategori=${c.slug}`} className="text-white/68 hover:text-white">
                  {c.name}
                </Link>
              ))}
              <Link href="/katalog" className="text-white/68 hover:text-white">Semua Produk</Link>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-white">Kontak</h4>
            <span className="mb-3.5 block font-bold text-white">0852-0386-6650</span>
            <a
              href={WA_GENERAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-2 text-sm font-bold text-white hover:bg-whatsapp-600"
            >
              <IconWhatsApp className="size-4" />
              Hubungi via WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-white/15 pt-6 text-center text-sm text-white/55">
          © 2026 kwt_gogreen — Kelompok Wanita Tani. Seluruh hak cipta dilindungi.
        </div>
      </div>
    </footer>
  );
}
