"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconClose, IconMenu, IconWhatsApp } from "@/components/icons";
import { WA_GENERAL_LINK } from "@/lib/products";

const NAV_LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/tentang", label: "Tentang Kami" },
  { href: "/katalog", label: "Katalog Produk" },
  { href: "/kontak", label: "Kontak" },
];

export default function Header({ logoUrl }: { logoUrl?: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 h-[78px] border-b border-border bg-white">
      <div className="mx-auto flex h-full max-w-[1180px] items-center justify-between gap-4 px-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label="kwt_gogreen, kembali ke beranda">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoUrl} alt="Logo" className="size-[42px] flex-none rounded-xl object-contain" />
          ) : (
            <span className="flex size-[42px] flex-none items-center justify-center rounded-xl bg-primary">
              <svg viewBox="0 0 24 24" className="size-6" fill="none">
                <path d="M12 21c-4-3-7-7-7-11a7 7 0 0114 0c0 4-3 8-7 11z" fill="#fff" opacity=".92" />
                <path d="M12 21V9" stroke="#1a4d2e" strokeWidth={1.6} strokeLinecap="round" />
              </svg>
            </span>
          )}
          <span className="flex flex-col leading-tight">
            <strong className="text-[1.05rem] font-extrabold tracking-tight">kwt_gogreen</strong>
            <span className="text-[0.72rem] font-semibold text-muted">Kelompok Wanita Tani</span>
          </span>
        </Link>

        <nav
          className={`${
            open ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-1.5"
          } fixed left-0 right-0 top-[78px] flex max-h-[calc(100vh-78px)] flex-col items-stretch gap-0 overflow-auto border-b border-border bg-white px-6 pb-6 pt-2 shadow-lg transition md:static md:flex md:max-h-none md:flex-row md:items-center md:gap-8 md:overflow-visible md:border-0 md:bg-transparent md:p-0 md:opacity-100 md:pointer-events-auto md:translate-y-0 md:shadow-none`}
        >
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`border-b border-border py-3.5 font-semibold text-muted last:border-b-0 hover:text-ink md:border-none md:py-1 md:border-b-2 md:border-transparent ${
                  active ? "text-primary md:border-primary" : ""
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href={WA_GENERAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3 font-bold text-white transition hover:bg-whatsapp-600 md:hidden"
          >
            <IconWhatsApp className="size-[18px]" />
            Pesan via WhatsApp
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={WA_GENERAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-whatsapp px-6 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-whatsapp-600 hover:shadow-md md:inline-flex"
          >
            <IconWhatsApp className="size-[18px]" />
            Pesan via WhatsApp
          </a>
          <button
            type="button"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-[42px] flex-none items-center justify-center rounded-lg hover:bg-primary-50 md:hidden"
          >
            {open ? <IconClose className="size-[22px]" /> : <IconMenu className="size-[22px]" />}
          </button>
        </div>
      </div>
    </header>
  );
}
