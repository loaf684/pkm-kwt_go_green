"use client";

import { useMemo, useState } from "react";
import type { Category, Product } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import { IconSearch } from "@/components/icons";

type Filter = "semua" | string; // "semua" or a category slug

export default function CatalogSection({
  products,
  categories,
  initialCategory = "semua",
}: {
  products: Product[];
  categories: Category[];
  initialCategory?: Filter;
}) {
  const [filter, setFilter] = useState<Filter>(initialCategory);
  const [term, setTerm] = useState("");
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const tabs = useMemo(
    () => [{ slug: "semua", name: "Semua" }, ...categories.map((c) => ({ slug: c.slug, name: c.name }))],
    [categories]
  );

  const filtered = useMemo(() => {
    const t = term.toLowerCase().trim();
    return products.filter(
      (p) => (filter === "semua" || p.categorySlug === filter) && (!t || p.name.toLowerCase().includes(t))
    );
  }, [products, filter, term]);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.slug}
              type="button"
              onClick={() => setFilter(tab.slug)}
              className={`rounded-full border px-4.5 py-2.5 text-sm font-bold transition ${
                filter === tab.slug
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-white text-muted hover:border-primary hover:text-primary"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
        <div className="relative w-full max-w-[280px]">
          <IconSearch className="pointer-events-none absolute left-3.5 top-1/2 size-[17px] -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Cari produk..."
            className="w-full rounded-full border border-border bg-white py-2.5 pl-10 pr-4 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
          />
        </div>
      </div>

      <p className="mb-5 text-sm text-muted">Menampilkan {filtered.length} produk.</p>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-border py-14 text-center text-muted">
          <h3 className="mb-1 text-lg font-extrabold text-ink">Produk tidak ditemukan</h3>
          <p>Coba kata kunci lain atau pilih kategori berbeda.</p>
        </div>
      ) : (
        <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:snap-none sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
          {filtered.map((p) => (
            <div key={p.id} className="w-[78%] max-w-[300px] flex-none snap-start sm:w-auto sm:max-w-none">
              <ProductCard product={p} onDetail={() => setActiveProduct(p)} />
            </div>
          ))}
        </div>
      )}

      {activeProduct && <ProductModal product={activeProduct} onClose={() => setActiveProduct(null)} />}
    </div>
  );
}
