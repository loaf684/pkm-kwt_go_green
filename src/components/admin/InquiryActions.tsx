"use client";

import { useTransition } from "react";
import { clearInquiriesAction, deleteInquiryAction } from "@/lib/admin/actions";

export function DeleteInquiryButton({ id }: { id: number }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (confirm("Hapus pesan ini? Tindakan ini tidak bisa dibatalkan.")) {
          startTransition(async () => {
            await deleteInquiryAction(id);
          });
        }
      }}
      className="font-bold text-red-600 hover:underline disabled:opacity-50"
    >
      {pending ? "Menghapus..." : "Hapus"}
    </button>
  );
}

export default function ClearInquiriesButton() {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (confirm("Hapus semua pesan masuk? Tindakan ini tidak bisa dibatalkan.")) {
          startTransition(async () => {
            await clearInquiriesAction();
          });
        }
      }}
      className="rounded-full border border-red-200 px-3.5 py-2 text-sm font-bold text-red-600 transition hover:border-red-300 hover:bg-red-50 disabled:opacity-50"
    >
      {pending ? "Membersihkan..." : "Bersihkan Semua"}
    </button>
  );
}
