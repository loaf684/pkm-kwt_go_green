import Link from "next/link";
import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { updateProductAction } from "@/lib/admin/actions";
import { getProductById, getCategories } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: PageProps<"/admin/products/[id]/edit">) {
  const { id } = await params;
  const productId = Number(id);
  if (!Number.isFinite(productId)) notFound();

  const [product, categories] = await Promise.all([getProductById(productId), getCategories()]);
  if (!product) notFound();

  const boundAction = updateProductAction.bind(null, productId);

  return (
    <div>
      <Link href="/admin" className="mb-4 inline-flex items-center gap-1 text-sm font-bold text-muted hover:text-ink">
        ← Kembali
      </Link>
      <h1 className="mb-6 truncate text-xl font-extrabold sm:text-2xl">Ubah Produk — {product.name}</h1>
      <ProductForm action={boundAction} product={product} categories={categories} />
    </div>
  );
}
