import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "KWT Go Green Griya Asri — Hasil Pertanian Segar dari Petani",
    template: "%s — KWT Go Green Griya Asri",
  },
  description:
    "KWT Go Green Griya Asri: katalog hasil pertanian segar dari Kelompok Wanita Tani — sayuran dan tanaman pangan dengan harga serta stok yang transparan, dipesan langsung melalui WhatsApp.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} antialiased`}>
      <body className="flex min-h-screen flex-col bg-bg text-ink">{children}</body>
    </html>
  );
}
