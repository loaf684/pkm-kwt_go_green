"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/lib/admin/actions";

const LINKS = [
  {
    href: "/admin",
    label: "Produk",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-5">
        <path
          d="M4 7l8-4 8 4-8 4-8-4zm0 0v10l8 4m0-14v14m8-14v10l-8 4"
          stroke="currentColor"
          strokeWidth={1.7}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "/admin/categories",
    label: "Kategori",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-5">
        <rect x="3.5" y="3.5" width="7.5" height="7.5" rx="1.6" stroke="currentColor" strokeWidth={1.7} />
        <rect x="13" y="3.5" width="7.5" height="7.5" rx="1.6" stroke="currentColor" strokeWidth={1.7} />
        <rect x="3.5" y="13" width="7.5" height="7.5" rx="1.6" stroke="currentColor" strokeWidth={1.7} />
        <rect x="13" y="13" width="7.5" height="7.5" rx="1.6" stroke="currentColor" strokeWidth={1.7} />
      </svg>
    ),
  },
  {
    href: "/admin/settings",
    label: "Tampilan",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-5">
        <rect x="3.5" y="4.5" width="17" height="4" rx="1.6" stroke="currentColor" strokeWidth={1.7} />
        <rect x="3.5" y="10.5" width="12" height="4" rx="1.6" stroke="currentColor" strokeWidth={1.7} />
        <rect x="3.5" y="16.5" width="9" height="4" rx="1.6" stroke="currentColor" strokeWidth={1.7} />
      </svg>
    ),
  },
];

export default function AdminNav() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  return (
    <>
      {/* Desktop / tablet top nav */}
      <nav className="hidden items-center gap-1 sm:flex">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-full px-4 py-2 text-sm font-bold transition ${
              isActive(link.href)
                ? "bg-primary-50 text-primary"
                : "text-muted hover:bg-primary-50/60 hover:text-ink"
            }`}
          >
            {link.label}
          </Link>
        ))}
        <span className="mx-1 h-5 w-px bg-border" />
        <Link
          href="/"
          target="_blank"
          className="rounded-full px-4 py-2 text-sm font-bold text-muted transition hover:bg-primary-50/60 hover:text-ink"
        >
          Lihat Situs ↗
        </Link>
        <form action={logoutAction}>
          <button
            type="submit"
            className="rounded-full px-4 py-2 text-sm font-bold text-muted transition hover:bg-red-50 hover:text-red-600"
          >
            Keluar
          </button>
        </form>
      </nav>

      {/* Mobile bottom tab bar */}
      <nav
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-border bg-white/95 pb-[env(safe-area-inset-bottom,0px)] backdrop-blur sm:hidden"
        aria-label="Navigasi admin"
      >
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-col items-center gap-1 py-2.5 text-[0.68rem] font-bold transition ${
              isActive(link.href) ? "text-primary" : "text-muted"
            }`}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 py-2.5 text-[0.68rem] font-bold text-muted"
        >
          <svg viewBox="0 0 24 24" fill="none" className="size-5">
            <path
              d="M12 3l8 4-8 4-8-4 8-4zm-8 8l8 4 8-4M4 15l8 4 8-4"
              stroke="currentColor"
              strokeWidth={1.7}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Situs
        </a>
      </nav>
    </>
  );
}
