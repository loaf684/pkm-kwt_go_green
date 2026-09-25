"use client";

import { useActionState } from "react";
import { createCategoryAction } from "@/lib/admin/actions";

export default function NewCategoryForm() {
  const [state, formAction, pending] = useActionState(createCategoryAction, undefined);

  return (
    <form action={formAction} className="flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap">
      <div className="w-full sm:w-72 sm:max-w-full">
        <input
          name="name"
          required
          placeholder="Nama kategori baru, contoh: Buah-buahan"
          className="w-full rounded-[10px] border border-border bg-bg px-3.5 py-2.5 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
        />
        {state?.error && <p className="mt-1.5 text-xs font-semibold text-red-600">{state.error}</p>}
      </div>
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white transition hover:bg-primary-600 disabled:opacity-70 sm:w-auto"
      >
        {pending ? "Menyimpan..." : "+ Tambah Kategori"}
      </button>
    </form>
  );
}
