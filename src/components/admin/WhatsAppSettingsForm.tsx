"use client";

import { useActionState } from "react";
import { updateWhatsAppSettingsAction } from "@/lib/admin/actions";

export default function WhatsAppSettingsForm({
  phoneNumber,
}: {
  phoneNumber: string;
}) {
  const [state, formAction, pending] = useActionState(updateWhatsAppSettingsAction, undefined);

  return (
    <form action={formAction} className="rounded-2xl border border-border bg-white p-4 sm:p-5">
      <h3 className="font-bold">Nomor WhatsApp KWT</h3>
      <p className="mb-4 mt-1 text-xs leading-5 text-muted">
        Masukkan satu nomor Indonesia. Nomor ini otomatis dipakai pada tautan WhatsApp dan ditampilkan di situs.
        Format 08xx akan dikonversi ke kode negara 62 untuk tautan.
      </p>
      <label className="block max-w-md text-sm font-semibold">
        Nomor WhatsApp
        <input
          name="phoneNumber"
          type="tel"
          required
          defaultValue={phoneNumber}
          placeholder="0812-3456-7890"
          autoComplete="tel"
          className="mt-1.5 w-full rounded-[10px] border border-border bg-bg px-3.5 py-2.5 font-normal outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
        />
      </label>
      {state?.error && <p className="mt-3 text-sm font-semibold text-red-600">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="mt-4 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white transition hover:bg-primary-600 disabled:opacity-70"
      >
        {pending ? "Menyimpan..." : "Simpan Nomor"}
      </button>
    </form>
  );
}
