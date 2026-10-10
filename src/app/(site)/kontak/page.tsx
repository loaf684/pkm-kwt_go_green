import type { Metadata } from "next";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import ContactInfo from "@/components/ContactInfo";
import MapCard from "@/components/MapCard";
import ContactForm from "@/components/ContactForm";
import { WA_GENERAL_LINK } from "@/lib/products";
import { getPublicProducts, getSiteImages, getMapEmbedQuery } from "@/lib/db/queries";

export const metadata: Metadata = {
  title: "Kontak",
};

export default async function KontakPage() {
  const [products, images, mapQuery] = await Promise.all([
    getPublicProducts(),
    getSiteImages(),
    getMapEmbedQuery(),
  ]);
  const availableProducts = products
    .filter((product) => Number.parseInt(product.stock, 10) > 0)
    .map((product) => product.name);

  return (
    <>
      <PageBanner
        crumb="Kontak"
        title="Hubungi Kami"
        text="Mau memesan atau bertanya soal produk? Kirim pesan lewat formulir atau WhatsApp."
        bgUrl={images.page_banner}
      />

      <section className="py-[clamp(3.4rem,7vw,6rem)]">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-10 px-6 lg:grid-cols-2 lg:gap-12">
          <div>
            <ContactInfo
              eyebrow="Kontak Kami"
              text="Ada yang ingin ditanyakan? Kirim pesan, kami akan membantu."
            />
            <MapCard imageUrl={images.map} mapQuery={mapQuery} />
          </div>
          <ContactForm productOptions={availableProducts} />
        </div>
      </section>

      <section className="bg-primary py-[clamp(3.4rem,7vw,6rem)] text-white">
        <div className="mx-auto max-w-xl px-6 text-center">
          <h2 className="text-[clamp(1.7rem,3.2vw,2.4rem)] font-extrabold tracking-tight text-white">
            Ingin Memesan Hasil Kebun?
          </h2>
          <p className="mt-3 text-white/85">
            Hubungi kami lewat WhatsApp untuk menanyakan stok dan memesan.
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
