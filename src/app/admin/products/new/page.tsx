import Link from "next/link";
import ProductForm from "@/components/admin/ProductForm";
import { createProductAction } from "@/lib/admin/actions";
import { getCategories } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div>
      <Link href="/admin" className="mb-4 inline-flex items-center gap-1 text-sm font-bold text-muted hover:text-ink">
        ← Kembali
      </Link>
      <h1 className="mb-6 text-xl font-extrabold sm:text-2xl">Tambah Produk</h1>
      <ProductForm action={createProductAction} categories={categories} />
    </div>
  );
}
