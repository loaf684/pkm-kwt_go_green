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
    default: "KWT_GOGREEN — Hasil Pertanian Segar dari Petani",
    template: "%s — KWT_GOGREEN",
  },
  description:
    "KWT_GOGREEN: katalog hasil pertanian segar dari Kelompok Wanita Tani — sayuran dan tanaman pangan dengan harga serta stok yang transparan, dipesan langsung melalui WhatsApp.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} antialiased`}>
      <body className="flex min-h-screen flex-col bg-bg text-ink">{children}</body>
    </html>
  );
}
