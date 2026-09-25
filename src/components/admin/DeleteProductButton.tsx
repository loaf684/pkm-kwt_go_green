"use client";

import { useTransition } from "react";
import { deleteProductAction } from "@/lib/admin/actions";

export default function DeleteProductButton({ id, name }: { id: number; name: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (confirm(`Hapus produk "${name}"? Tindakan ini tidak bisa dibatalkan.`)) {
          startTransition(() => {
            deleteProductAction(id);
          });
        }
      }}
      className="font-bold text-red-600 hover:underline disabled:opacity-50"
    >
      {pending ? "Menghapus..." : "Hapus"}
    </button>
  );
}
