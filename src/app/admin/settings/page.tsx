import Link from "next/link";
import { getAllSiteSettings } from "@/lib/db/queries";
import { SITE_IMAGE_SLOTS, MAP_EMBED_KEY } from "@/lib/site-images";
import SiteImageForm from "@/components/admin/SiteImageForm";
import MapEmbedForm from "@/components/admin/MapEmbedForm";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getAllSiteSettings();

  return (
    <div>
      <Link href="/admin" className="mb-4 inline-flex items-center gap-1 text-sm font-bold text-muted hover:text-ink">
        ← Kembali
      </Link>
      <h1 className="mb-2 text-xl font-extrabold sm:text-2xl">Tampilan Situs</h1>
      <p className="mb-6 max-w-2xl text-sm text-muted">
        Ganti ilustrasi bawaan di berbagai bagian situs — unggah file atau tempel link, mana saja yang lebih
        mudah. Kosongkan lalu simpan untuk kembali memakai ilustrasi bawaan.
      </p>

      <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted">Lokasi / Peta</h2>
      <div className="mb-8">
        <MapEmbedForm currentQuery={settings[MAP_EMBED_KEY]?.value ?? undefined} />
      </div>

      <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted">Gambar</h2>
      <div className="flex flex-col gap-3 sm:gap-4">
        {SITE_IMAGE_SLOTS.map((slot) => (
          <SiteImageForm key={slot.key} slot={slot} setting={settings[slot.key]} />
        ))}
      </div>
    </div>
  );
}
