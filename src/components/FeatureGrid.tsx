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
  { icon: IconPeople, title: "Dukung Petani Lokal", desc: "Setiap pembelian membantu pemasaran dan kesejahteraan Kelompok Mutiara Tani." },
];

export const ABOUT_FEATURES: Feature[] = [
  { icon: IconShield, title: "Kualitas Terjaga", desc: "Produk dipanen langsung oleh petani sehingga kesegaran dan kualitasnya selalu terjaga." },
  { icon: IconTag, title: "Harga Transparan", desc: "Harga dan stok ditampilkan jelas di setiap produk, tanpa biaya tersembunyi." },
  { icon: IconChat, title: "Pesan via WhatsApp", desc: "Pemesanan praktis langsung ke petani, cepat direspons tanpa perantara." },
  { icon: IconPeople, title: "Dukung Petani Lokal", desc: "Setiap pembelian membantu pemasaran dan kesejahteraan Kelompok Mutiara Tani." },
];

export default function FeatureGrid({ features }: { features: Feature[] }) {
  return (
    <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {features.map((f) => (
        <div key={f.title} className="rounded-[18px] border border-border bg-white p-8">
          <div className="mb-5 flex size-[58px] items-center justify-center rounded-2xl bg-primary-50 text-primary">
            <f.icon className="size-7" />
          </div>
          <h3 className="mb-2 text-xl font-extrabold">{f.title}</h3>
          <p className="text-[0.94rem] text-muted">{f.desc}</p>
        </div>
      ))}
    </div>
  );
}
