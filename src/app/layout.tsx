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
    default: "kwt_gogreen — Hasil Pertanian Segar dari Petani",
    template: "%s — kwt_gogreen",
  },
  description:
    "kwt_gogreen: katalog hasil pertanian segar Kelompok Wanita Tani — sayuran & tanaman pangan, harga dan stok transparan, pesan langsung via WhatsApp.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} antialiased`}>
      <body className="flex min-h-screen flex-col bg-bg text-ink">{children}</body>
    </html>
  );
}
