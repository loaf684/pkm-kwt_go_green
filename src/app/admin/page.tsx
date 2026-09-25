import Link from "next/link";
import { getAdminProducts, getRecentInquiries } from "@/lib/db/queries";
import { PRODUCT_ICONS } from "@/components/illustrations";
import DeleteProductButton from "@/components/admin/DeleteProductButton";
import ClearInquiriesButton, { DeleteInquiryButton } from "@/components/admin/InquiryActions";
import type { ProductRow } from "@/lib/db/schema";

export const dynamic = "force-dynamic";

function formatRupiah(n: number): string {
  return `Rp${n.toLocaleString("id-ID")}`;
}

function thumbSrc(p: ProductRow): string | null {
  if (p.imageUrl) return p.imageUrl;
  if (p.imageData) return `/api/products/${p.id}/image?v=${Math.floor(new Date(p.updatedAt).getTime() / 1000)}`;
  return null;
}

export default async function AdminDashboard() {
  const [rows, recentInquiries] = await Promise.all([
    getAdminProducts(),
    getRecentInquiries(8).catch(() => []),
  ]);

  return (
    <div className="flex flex-col gap-10">
      {/* Stat summary */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-2xl border border-border bg-white p-4">
          <div className="text-xs font-bold uppercase tracking-wide text-muted">Produk</div>
          <div className="mt-1 text-2xl font-extrabold">{rows.length}</div>
        </div>
        <div className="rounded-2xl border border-border bg-white p-4">
          <div className="text-xs font-bold uppercase tracking-wide text-muted">Total Stok</div>
          <div className="mt-1 text-2xl font-extrabold">
            {rows.reduce((sum, r) => sum + r.product.stockKg, 0)} <span className="text-sm font-semibold text-muted">kg</span>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-white p-4">
          <div className="text-xs font-bold uppercase tracking-wide text-muted">Stok Habis</div>
          <div className="mt-1 text-2xl font-extrabold">{rows.filter((r) => r.product.stockKg <= 0).length}</div>
        </div>
        <div className="rounded-2xl border border-border bg-white p-4">
          <div className="text-xs font-bold uppercase tracking-wide text-muted">Pesan Masuk</div>
          <div className="mt-1 text-2xl font-extrabold">{recentInquiries.length}</div>
        </div>
      </section>

      <section>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-xl font-extrabold sm:text-2xl">Produk ({rows.length})</h1>
          <div className="flex flex-1 justify-end gap-2.5 sm:flex-none">
            <Link
              href="/admin/categories"
              className="rounded-full border border-border bg-white px-4 py-2.5 text-sm font-bold text-ink transition hover:border-primary hover:text-primary sm:px-5"
            >
              Kategori
            </Link>
            <Link
              href="/admin/products/new"
              className="rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-white transition hover:bg-primary-600 sm:px-5"
            >
              + Tambah Produk
            </Link>
          </div>
        </div>

        {rows.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-border py-14 text-center text-muted">
            Belum ada produk. Klik &ldquo;Tambah Produk&rdquo; untuk mulai mengisi katalog.
          </div>
        ) : (
          <>
            {/* Mobile: card list */}
            <div className="flex flex-col gap-3 sm:hidden">
              {rows.map(({ product: p, category }) => {
                const src = thumbSrc(p);
                const Icon = PRODUCT_ICONS[p.icon];
                return (
                  <div key={p.id} className="flex gap-3 rounded-2xl border border-border bg-white p-3.5">
                    <span className="flex size-16 flex-none items-center justify-center overflow-hidden rounded-xl bg-primary-50">
                      {src ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={src} alt="" className="size-full object-cover" />
                      ) : (
                        <Icon className="size-10" />
                      )}
                    </span>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="truncate font-bold">{p.name}</div>
                          <div className="text-xs text-muted">{category?.name ?? "Tanpa kategori"}</div>
                        </div>
                        <span
                          className={`flex-none rounded-full px-2 py-0.5 text-[0.68rem] font-bold ${
                            p.stockKg > 0 ? "bg-primary-50 text-primary" : "bg-red-50 text-red-600"
                          }`}
                        >
                          {p.stockKg} kg
                        </span>
                      </div>
                      <div className="mt-1 font-extrabold">{formatRupiah(p.priceRp)}</div>
                      <div className="mt-2 flex items-center gap-4 border-t border-border pt-2 text-sm">
                        <Link href={`/admin/products/${p.id}/edit`} className="font-bold text-primary hover:underline">
                          Ubah
                        </Link>
                        <DeleteProductButton id={p.id} name={p.name} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop: table */}
            <div className="hidden overflow-x-auto rounded-2xl border border-border bg-white sm:block">
              <table className="w-full text-left text-sm">
                <thead className="bg-primary-50 text-xs font-bold uppercase tracking-wide text-muted">
                  <tr>
                    <th className="px-4 py-3">Produk</th>
                    <th className="px-4 py-3">Kategori</th>
                    <th className="px-4 py-3">Stok</th>
                    <th className="px-4 py-3">Harga</th>
                    <th className="px-4 py-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(({ product: p, category }) => {
                    const src = thumbSrc(p);
                    const Icon = PRODUCT_ICONS[p.icon];
                    return (
                      <tr key={p.id} className="border-t border-border transition hover:bg-primary-50/40">
                        <td className="flex items-center gap-3 px-4 py-3">
                          <span className="flex size-10 flex-none items-center justify-center overflow-hidden rounded-lg bg-primary-50">
                            {src ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={src} alt="" className="size-full object-cover" />
                            ) : (
                              <Icon className="size-8" />
                            )}
                          </span>
                          <div>
                            <div className="font-bold">{p.name}</div>
                            <div className="text-xs text-muted">/{p.slug}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3">{category?.name ?? "Tanpa kategori"}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                              p.stockKg > 0 ? "bg-primary-50 text-primary" : "bg-red-50 text-red-600"
                            }`}
                          >
                            {p.stockKg} kg
                          </span>
                        </td>
                        <td className="px-4 py-3 font-semibold">{formatRupiah(p.priceRp)}</td>
                        <td className="px-4 py-3">
                          <div className="flex justify-end gap-4">
                            <Link href={`/admin/products/${p.id}/edit`} className="font-bold text-primary hover:underline">
                              Ubah
                            </Link>
                            <DeleteProductButton id={p.id} name={p.name} />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>

      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-extrabold">Pesan Masuk Terbaru</h2>
          {recentInquiries.length > 0 && <ClearInquiriesButton />}
        </div>
        {recentInquiries.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-border py-10 text-center text-sm text-muted">
            Belum ada pesan dari formulir kontak.
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {recentInquiries.map((inq) => (
              <div key={inq.id} className="rounded-xl border border-border bg-white px-4 py-3 text-sm">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <strong>{inq.name}</strong>
                  <span className="text-xs text-muted">
                    {new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short" }).format(inq.createdAt)}
                  </span>
                </div>
                <div className="text-muted">
                  {inq.phone}
                  {inq.product ? ` · ${inq.product}` : ""}
                </div>
                {inq.message && <p className="mt-1">{inq.message}</p>}
                <div className="mt-2 border-t border-border pt-2 text-right">
                  <DeleteInquiryButton id={inq.id} />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
