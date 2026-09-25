"use client";

import { useActionState, useState } from "react";
import { updateMapEmbedAction } from "@/lib/admin/actions";
import { toGoogleMapsEmbedSrc } from "@/lib/maps";

export default function MapEmbedForm({ currentQuery }: { currentQuery?: string }) {
  const [state, formAction, pending] = useActionState(updateMapEmbedAction, undefined);
  const [query, setQuery] = useState(currentQuery ?? "");

  const previewSrc = toGoogleMapsEmbedSrc(query);

  return (
    <div className="rounded-2xl border border-border bg-white p-4 sm:p-5">
      <h3 className="font-bold">Peta Google Maps Aktif</h3>
      <p className="mb-3 text-xs text-muted">
        Isi dengan alamat, nama tempat, koordinat (&ldquo;lat,lng&rdquo;), atau tempel link Google Maps dari
        peramban Anda. Kosongkan untuk memakai foto/ilustrasi peta biasa di bagian atas sebagai gantinya.
      </p>

      <form action={formAction} className="mb-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <input
          name="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Contoh: Jalan Madako No. 12, Tolitoli — atau tempel link Google Maps"
          className="w-full min-w-0 flex-1 rounded-[10px] border border-border bg-bg px-3.5 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 sm:min-w-[260px]"
        />
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white transition hover:bg-primary-600 disabled:opacity-70 sm:w-auto"
        >
          {pending ? "Menyimpan..." : "Simpan"}
        </button>
      </form>
      {state?.error && <p className="mb-3 text-xs font-semibold text-red-600">{state.error}</p>}

      <div className="aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-primary-50">
        {previewSrc ? (
          <iframe src={previewSrc} className="size-full border-0" loading="lazy" title="Pratinjau peta" />
        ) : (
          <div className="flex size-full items-center justify-center text-center text-xs text-muted">
            Belum ada peta aktif — kolom di atas kosong.
          </div>
        )}
      </div>
    </div>
  );
}
