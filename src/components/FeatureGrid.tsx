import type { ComponentType, SVGProps } from "react";
import { IconChat, IconPeople, IconShield, IconTag } from "@/components/icons";

export interface Feature {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  desc: string;
}

export const HOME_FEATURES: Feature[] = [
  { icon: IconShield, title: "Segar dari Kebun", desc: "Produk dipanen langsung oleh petani sehingga kesegaran dan kualitasnya terjaga." },
  { icon: IconTag, title: "Harga Transparan", desc: "Harga dan stok ditampilkan jelas di setiap produk, tanpa biaya tersembunyi." },
  { icon: IconChat, title: "Pesan via WhatsApp", desc: "Pemesanan praktis langsung ke petani, cepat direspons tanpa perantara." },
  { icon: IconPeople, title: "Dukung Petani Lokal", desc: "Setiap pembelian membantu pemasaran dan kesejahteraan Kelompok Wanita Tani." },
];

export const ABOUT_FEATURES: Feature[] = [
  { icon: IconShield, title: "Kualitas Terjaga", desc: "Produk dipanen langsung oleh petani sehingga kesegaran dan kualitasnya selalu terjaga." },
  { icon: IconTag, title: "Harga Transparan", desc: "Harga dan stok ditampilkan jelas di setiap produk, tanpa biaya tersembunyi." },
  { icon: IconChat, title: "Pesan via WhatsApp", desc: "Pemesanan praktis langsung ke petani, cepat direspons tanpa perantara." },
  { icon: IconPeople, title: "Dukung Petani Lokal", desc: "Setiap pembelian membantu pemasaran dan kesejahteraan Kelompok Wanita Tani." },
];

export default function FeatureGrid({ features }: { features: Feature[] }) {
  return (
    <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
      {features.map((f) => (
        <div key={f.title} className="rounded-[18px] border border-border bg-white p-4 sm:p-8">
          <div className="mb-4 flex size-11 items-center justify-center rounded-2xl bg-primary-50 text-primary sm:mb-5 sm:size-[58px]">
            <f.icon className="size-7" />
          </div>
          <h3 className="mb-2 text-base font-extrabold leading-tight sm:text-xl">{f.title}</h3>
          <p className="text-sm leading-6 text-muted sm:text-[0.94rem]">{f.desc}</p>
        </div>
      ))}
    </div>
  );
}
