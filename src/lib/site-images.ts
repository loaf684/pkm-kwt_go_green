export interface SiteImageSlot {
  key: string;
  label: string;
  hint: string;
}

export const SITE_IMAGE_SLOTS: SiteImageSlot[] = [
  { key: "logo", label: "Logo (menu atas)", hint: "Persegi. Idealnya 128×128px ke atas, latar transparan." },
  { key: "hero", label: "Latar Belakang Hero (Beranda)", hint: "Lebar. Idealnya 1600×900px ke atas." },
  { key: "page_banner", label: "Latar Banner Halaman (Tentang / Katalog / Kontak)", hint: "Lebar, sama seperti Latar Hero." },
  { key: "about_main", label: "Gambar Utama — Tentang Kami", hint: "Potret atau persegi." },
  { key: "about_accent", label: "Gambar Kecil — Tentang Kami", hint: "Persegi." },
  { key: "vision", label: "Gambar Visi & Komitmen (halaman Tentang)", hint: "Format lanskap." },
  { key: "map", label: "Gambar Peta (halaman Kontak & Beranda)", hint: "Lanskap — bisa tangkapan layar lokasi Anda di Google Maps." },
];

export type SiteImageMap = Record<string, string>;

// Key used for the separate "live Google Maps embed" setting (not an image
// slot — a place/address/link that gets turned into an iframe embed).
export const MAP_EMBED_KEY = "map_embed_query";
