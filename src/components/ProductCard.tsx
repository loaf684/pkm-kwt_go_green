import type { Product } from "@/lib/products";
import { productWaLink } from "@/lib/products";
import ProductImage from "@/components/ProductImage";

export default function ProductCard({
  product,
  onDetail,
}: {
  product: Product;
  onDetail: () => void;
}) {
  return (
    <article className="flex flex-col overflow-hidden rounded-[18px] border border-border bg-white transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-primary-50">
        <ProductImage product={product} className="size-full object-cover" iconClassName="h-[78%] w-[78%]" />
      </div>
      <div className="flex flex-1 flex-col gap-2.5 px-5 pb-6 pt-5">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-primary-50 px-2.5 py-1 text-xs font-bold text-primary">
            {product.categoryLabel}
          </span>
          <span className="rounded-full bg-[#fdf1de] px-2.5 py-1 text-xs font-bold text-accent-600">
            Stok {product.stock}
          </span>
        </div>
        <h3 className="text-xl font-extrabold">{product.name}</h3>
        <p className="flex-1 text-sm text-muted">{product.desc}</p>
        <div className="text-lg font-extrabold">
          {product.price} <span className="text-sm font-semibold text-muted">{product.unit}</span>
        </div>
        <div className="mt-1 flex items-center justify-between">
          <button
            type="button"
            onClick={onDetail}
            className="font-bold text-primary hover:underline"
          >
            Detail
          </button>
          <a
            href={productWaLink(product.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-whatsapp px-4 py-2 text-sm font-bold text-white hover:bg-whatsapp-600"
          >
            Pesan
          </a>
        </div>
      </div>
    </article>
  );
}
