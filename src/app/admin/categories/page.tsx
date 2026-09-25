import Link from "next/link";
import { getCategories, countProductsInCategory } from "@/lib/db/queries";
import DeleteCategoryButton from "@/components/admin/DeleteCategoryButton";
import NewCategoryForm from "@/components/admin/NewCategoryForm";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const categoryRows = await getCategories();
  const counts = await Promise.all(categoryRows.map((c) => countProductsInCategory(c.id)));

  return (
    <div>
      <Link href="/admin" className="mb-4 inline-block text-sm font-bold text-muted hover:text-ink">
        ← Kembali
      </Link>
      <h1 className="mb-6 text-2xl font-extrabold">Kategori Produk</h1>

      <div className="mb-8 rounded-2xl border border-border bg-white p-5">
        <NewCategoryForm />
      </div>

      {categoryRows.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-border py-14 text-center text-muted">
          Belum ada kategori. Tambahkan satu di atas.
        </div>
      ) : (
        <>
          {/* Mobile: card list */}
          <div className="flex flex-col gap-2.5 sm:hidden">
            {categoryRows.map((c, i) => (
              <div key={c.id} className="flex items-center justify-between gap-3 rounded-xl border border-border bg-white px-4 py-3.5">
                <div className="min-w-0">
                  <div className="truncate font-bold">{c.name}</div>
                  <div className="text-xs text-muted">
                    /{c.slug} · {counts[i]} produk
                  </div>
                </div>
                <DeleteCategoryButton id={c.id} name={c.name} />
              </div>
            ))}
          </div>

          {/* Desktop: table */}
          <div className="hidden overflow-hidden rounded-2xl border border-border bg-white sm:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-primary-50 text-xs font-bold uppercase tracking-wide text-muted">
                <tr>
                  <th className="px-4 py-3">Nama</th>
                  <th className="px-4 py-3">Slug</th>
                  <th className="px-4 py-3">Jumlah Produk</th>
                  <th className="px-4 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {categoryRows.map((c, i) => (
                  <tr key={c.id} className="border-t border-border transition hover:bg-primary-50/40">
                    <td className="px-4 py-3 font-bold">{c.name}</td>
                    <td className="px-4 py-3 text-muted">/{c.slug}</td>
                    <td className="px-4 py-3">{counts[i]}</td>
                    <td className="px-4 py-3 text-right">
                      <DeleteCategoryButton id={c.id} name={c.name} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      <p className="mt-4 text-xs text-muted">
        Kategori yang masih dipakai produk tidak bisa dihapus — pindahkan produknya ke kategori lain dulu lewat
        halaman ubah produk.
      </p>
    </div>
  );
}
