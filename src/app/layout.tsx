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
    default: "KWT Go Green Griya Asri: Hasil Pertanian Segar",
    template: "%s | KWT Go Green Griya Asri",
  },
  description:
    "Lihat sayuran dan hasil kebun KWT Go Green Griya Asri. Cek harga serta stok, lalu pesan langsung lewat WhatsApp.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} antialiased`}>
      <body className="flex min-h-screen flex-col bg-bg text-ink">{children}</body>
    </html>
  );
}
