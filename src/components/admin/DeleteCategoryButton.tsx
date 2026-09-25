"use client";

import { useTransition } from "react";
import { deleteCategoryAction } from "@/lib/admin/actions";

export default function DeleteCategoryButton({ id, name }: { id: number; name: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!confirm(`Hapus kategori "${name}"?`)) return;
        startTransition(async () => {
          const result = await deleteCategoryAction(id);
          if (result?.error) alert(result.error);
        });
      }}
      className="font-bold text-red-600 hover:underline disabled:opacity-50"
    >
      {pending ? "Menghapus..." : "Hapus"}
    </button>
  );
}
