"use client";

import { useMemo, useState } from "react";
import type { Category, Product } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import { IconSearch } from "@/components/icons";
import { waLink } from "@/lib/products";

type Filter = "semua" | string; // "semua" or a category slug

function getQuantity(value: string) {
  return Number.parseInt(value, 10) || 0;
}

function getPrice(value: string) {
  return Number(value.replace(/\D/g, "")) || 0;
}

function formatPrice(value: number) {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

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
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);

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

  const cartProducts = products.filter((product) => (cart[product.id] ?? 0) > 0);
  const cartCount = cartProducts.reduce((total, product) => total + cart[product.id], 0);
  const cartTotal = cartProducts.reduce(
    (total, product) => total + getPrice(product.price) * cart[product.id],
    0
  );

  function addToCart(product: Product) {
    const available = getQuantity(product.stock);
    if (available < 1) return;
    setCart((current) => ({
      ...current,
      [product.id]: Math.min((current[product.id] ?? 0) + 1, available),
    }));
    setCartOpen(true);
  }

  function changeQuantity(product: Product, amount: number) {
    const available = getQuantity(product.stock);
    setCart((current) => {
      const nextQuantity = Math.min((current[product.id] ?? 0) + amount, available);
      if (nextQuantity < 1) {
        const next = { ...current };
        delete next[product.id];
        return next;
      }
      return { ...current, [product.id]: nextQuantity };
    });
  }

  const checkoutMessage = [
    "Halo KWT Go Green Griya Asri!",
    "",
    "Saya ingin memesan:",
    ...cartProducts.map((product) => {
      const quantity = cart[product.id];
      return `* ${product.name} x${quantity} = ${formatPrice(getPrice(product.price) * quantity)}`;
    }),
    "",
    `Total: ${formatPrice(cartTotal)}`,
    "",
    "Mohon info ketersediaan dan proses pesanannya. Terima kasih!",
  ].join("\n");

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
              <ProductCard
                product={p}
                onDetail={() => setActiveProduct(p)}
                onAddToCart={() => addToCart(p)}
              />
            </div>
          ))}
        </div>
      )}

      {activeProduct && (
        <ProductModal
          product={activeProduct}
          onClose={() => setActiveProduct(null)}
          onAddToCart={() => {
            addToCart(activeProduct);
            setActiveProduct(null);
          }}
        />
      )}

      {cartCount > 0 && (
        <>
          {cartOpen && (
            <section
              aria-label="Keranjang belanja"
              className="fixed bottom-20 left-4 z-[150] max-h-[70vh] w-[min(24rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-border bg-white p-5 shadow-2xl sm:bottom-24 sm:left-6"
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <h3 className="text-lg font-extrabold">Keranjang ({cartCount})</h3>
                <button
                  type="button"
                  onClick={() => setCartOpen(false)}
                  className="rounded-full px-3 py-1 text-sm font-bold text-muted hover:bg-primary-50"
                >
                  Tutup
                </button>
              </div>
              <ul className="divide-y divide-border">
                {cartProducts.map((product) => {
                  const quantity = cart[product.id];
                  return (
                    <li key={product.id} className="flex items-center justify-between gap-3 py-3">
                      <div className="min-w-0">
                        <p className="truncate font-bold">{product.name}</p>
                        <p className="text-sm text-muted">
                          {formatPrice(getPrice(product.price))} x {quantity}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <button
                          type="button"
                          aria-label={`Kurangi ${product.name}`}
                          onClick={() => changeQuantity(product, -1)}
                          className="flex size-8 items-center justify-center rounded-full border border-border font-bold hover:bg-primary-50"
                        >
                          −
                        </button>
                        <span className="min-w-4 text-center font-bold">{quantity}</span>
                        <button
                          type="button"
                          aria-label={`Tambah ${product.name}`}
                          disabled={quantity >= getQuantity(product.stock)}
                          onClick={() => changeQuantity(product, 1)}
                          className="flex size-8 items-center justify-center rounded-full border border-border font-bold hover:bg-primary-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          +
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-4 font-extrabold">
                <span>Total</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <a
                href={waLink(checkoutMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex w-full items-center justify-center rounded-full bg-whatsapp px-5 py-3 font-bold text-white transition hover:bg-whatsapp-600"
              >
                Pesan via WhatsApp
              </a>
            </section>
          )}
          <button
            type="button"
            aria-expanded={cartOpen}
            onClick={() => setCartOpen((open) => !open)}
            className="fixed bottom-5 left-4 z-[150] flex items-center gap-3 rounded-full bg-primary px-5 py-3 font-bold text-white shadow-lg transition hover:bg-primary-600 sm:bottom-7 sm:left-6"
          >
            <span>Keranjang ({cartCount})</span>
            <span>{formatPrice(cartTotal)}</span>
          </button>
        </>
      )}
    </div>
  );
}
