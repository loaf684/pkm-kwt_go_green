import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/admin/session";
import AdminNav from "@/components/admin/AdminNav";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const authed = await verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);

  return (
    <div className="min-h-screen bg-bg">
      <header className="sticky top-0 z-30 border-b border-border bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3.5 sm:px-6 sm:py-4">
          <Link href="/admin" className="flex items-center gap-2 font-extrabold tracking-tight">
            <span className="flex size-8 flex-none items-center justify-center rounded-lg bg-primary text-white">
              <svg viewBox="0 0 24 24" className="size-4" fill="none">
                <path d="M12 21c-4-3-7-7-7-11a7 7 0 0114 0c0 4-3 8-7 11z" fill="currentColor" opacity=".92" />
              </svg>
            </span>
            <span className="hidden sm:inline">
              KWT_GOGREEN <span className="font-semibold text-muted">· Admin</span>
            </span>
            <span className="sm:hidden">Admin</span>
          </Link>
          {authed && <AdminNav />}
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8 pb-24 sm:px-6 sm:py-10 sm:pb-10">{children}</main>
    </div>
  );
}
