"use client";

import { useEffect } from "react";
import type { Product } from "@/lib/products";
import { productWaLink } from "@/lib/products";
import ProductImage from "@/components/ProductImage";
import { IconClose } from "@/components/icons";

export default function ProductModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#080e0a]/60 p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative max-h-[88vh] w-full max-w-[600px] overflow-auto rounded-[28px] bg-white" role="dialog" aria-modal="true" aria-label={`Detail produk ${product.name}`}>
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup"
          className="absolute right-4 top-4 z-10 flex size-[38px] items-center justify-center rounded-full bg-bg hover:bg-primary-50"
        >
          <IconClose className="size-[18px]" />
        </button>
        <div className="flex aspect-video items-center justify-center overflow-hidden rounded-t-[28px] bg-primary-50">
          <ProductImage product={product} className="size-full object-cover" iconClassName="w-[46%]" />
        </div>
        <div className="flex flex-col gap-3.5 px-8 py-9">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-primary-50 px-2.5 py-1 text-xs font-bold text-primary">
              {product.categoryLabel}
            </span>
            <span className="rounded-full bg-[#fdf1de] px-2.5 py-1 text-xs font-bold text-accent-600">
              Stok {product.stock}
            </span>
          </div>
          <h3 className="text-2xl font-extrabold">{product.name}</h3>
          <p className="text-[0.98rem] text-muted">{product.desc}</p>
          <div className="text-[1.35rem] font-extrabold">
            {product.price} <span className="text-sm font-semibold text-muted">{product.unit}</span>
          </div>
          <a
            href={productWaLink(product.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-whatsapp px-6 py-3 font-bold text-white hover:bg-whatsapp-600"
          >
            Pesan via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
