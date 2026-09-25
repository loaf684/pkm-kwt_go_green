"use server";

import { db } from "@/lib/db";
import { inquiries } from "@/lib/db/schema";

export interface InquiryInput {
  name: string;
  phone: string;
  product?: string;
  message?: string;
}

/**
 * Persists a contact-form submission. Best-effort: the contact form still
 * opens WhatsApp even if this fails, so a database hiccup never blocks the
 * visitor from reaching the farmer group.
 */
export async function submitInquiry(input: InquiryInput): Promise<{ ok: boolean; error?: string }> {
  try {
    if (!input.name?.trim() || !input.phone?.trim()) {
      return { ok: false, error: "Nama dan nomor WhatsApp wajib diisi." };
    }
    await db.insert(inquiries).values({
      name: input.name.trim(),
      phone: input.phone.trim(),
      product: input.product || null,
      message: input.message || null,
    });
    return { ok: true };
  } catch (err) {
    console.error("submitInquiry failed:", (err as Error).message);
    return { ok: false, error: "Gagal menyimpan (tidak masalah, pesan WhatsApp tetap terkirim)." };
  }
}
