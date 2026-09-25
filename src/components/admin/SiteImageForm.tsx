"use client";

import { useActionState, useState, type ChangeEvent } from "react";
import { updateSiteImageAction } from "@/lib/admin/actions";
import type { SiteImageSlot } from "@/lib/site-images";
import type { SiteSettingRow } from "@/lib/db/schema";

function resolvedSrc(setting?: SiteSettingRow): string | null {
  if (!setting) return null;
  if (setting.value) return setting.value;
  if (setting.imageData) {
    const v = Math.floor(new Date(setting.updatedAt).getTime() / 1000);
    return `/api/site-images/${setting.key}/image?v=${v}`;
  }
  return null;
}

export default function SiteImageForm({ slot, setting }: { slot: SiteImageSlot; setting?: SiteSettingRow }) {
  const boundAction = updateSiteImageAction.bind(null, slot.key);
  const [state, formAction, pending] = useActionState(boundAction, undefined);

  const currentSrc = resolvedSrc(setting);
  const [mode, setMode] = useState<"upload" | "link">(setting?.value ? "link" : "upload");
  const [removeImage, setRemoveImage] = useState(false);
  const [linkValue, setLinkValue] = useState(setting?.value ?? "");
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [previewOk, setPreviewOk] = useState(true);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setUploadPreview(URL.createObjectURL(file));
      setRemoveImage(false);
    } else {
      setUploadPreview(null);
    }
  }

  const previewSrc = removeImage
    ? null
    : mode === "upload"
      ? uploadPreview ?? currentSrc
      : linkValue.trim() || currentSrc;

  return (
    <div className="rounded-2xl border border-border bg-white p-4 sm:p-5">
      <div className="grid grid-cols-[80px_1fr] gap-3 sm:grid-cols-[120px_1fr] sm:gap-4">
        <div className="flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-primary-50">
          {previewSrc && previewOk ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={previewSrc}
              alt=""
              className="size-full object-cover"
              onError={() => setPreviewOk(false)}
              onLoad={() => setPreviewOk(true)}
            />
          ) : (
            <span className="px-2 text-center text-xs text-muted">Ilustrasi bawaan</span>
          )}
        </div>

        <div>
          <h3 className="font-bold">{slot.label}</h3>
          <p className="mb-2 text-xs text-muted">{slot.hint}</p>

          <div className="mb-2 inline-flex rounded-full border border-border bg-bg p-1">
            <button
              type="button"
              onClick={() => setMode("upload")}
              className={`rounded-full px-3.5 py-1 text-xs font-bold transition ${mode === "upload" ? "bg-primary text-white" : "text-muted"}`}
            >
              Upload File
            </button>
            <button
              type="button"
              onClick={() => setMode("link")}
              className={`rounded-full px-3.5 py-1 text-xs font-bold transition ${mode === "link" ? "bg-primary text-white" : "text-muted"}`}
            >
              Link Gambar
            </button>
          </div>

          <form action={formAction} className="flex flex-col gap-2">
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-start">
              {mode === "upload" ? (
                <input
                  key="upload"
                  type="file"
                  name="imageFile"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block text-xs file:mr-3 file:rounded-full file:border-0 file:bg-primary-50 file:px-3.5 file:py-2 file:text-xs file:font-bold file:text-primary"
                />
              ) : (
                <input
                  key="link"
                  type="text"
                  name="url"
                  value={linkValue}
                  onChange={(e) => {
                    setLinkValue(e.target.value);
                    setPreviewOk(true);
                    setRemoveImage(false);
                  }}
                  placeholder="https://... (kosongkan untuk ilustrasi bawaan)"
                  className="w-full min-w-0 flex-1 rounded-[10px] border border-border bg-bg px-3.5 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 sm:min-w-[220px]"
                />
              )}
              <button
                type="submit"
                disabled={pending}
                className="w-full rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white transition hover:bg-primary-600 disabled:opacity-70 sm:w-auto"
              >
                {pending ? "Menyimpan..." : "Simpan"}
              </button>
            </div>

            {currentSrc && (
              <label className="flex w-fit items-center gap-2 text-xs font-semibold text-red-600">
                <input
                  type="checkbox"
                  name="removeImage"
                  checked={removeImage}
                  onChange={(e) => setRemoveImage(e.target.checked)}
                />
                Hapus gambar saat ini (kembali ke ilustrasi bawaan)
              </label>
            )}
          </form>

          {state?.error && <p className="mt-1.5 text-xs font-semibold text-red-600">{state.error}</p>}
        </div>
      </div>
    </div>
  );
}
