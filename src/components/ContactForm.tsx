"use client";

import { useState, type FormEvent } from "react";
import { waLink } from "@/lib/products";
import { submitInquiry } from "@/lib/actions";
import { IconWhatsApp } from "@/components/icons";

type ContactFormProps = {
  productOptions: string[];
};

export default function ContactForm({ productOptions }: ContactFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [product, setProduct] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: boolean; phone?: boolean }>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName || !trimmedPhone) {
      setErrors({ name: !trimmedName, phone: !trimmedPhone });
      return;
    }
    setErrors({});
    setStatus("sending");

    // Best-effort: record the lead in Postgres, but never let a DB hiccup
    // stop the visitor from reaching WhatsApp.
    try {
      await submitInquiry({ name: trimmedName, phone: trimmedPhone, product, message });
    } catch {
      // already logged server-side; proceed regardless
    }

    let text = `Halo, nama saya ${trimmedName}. Saya ingin memesan produk dari Kelompok Wanita Tani.\n`;
    if (product) text += `Produk: ${product}\n`;
    text += `Nomor WhatsApp saya: ${trimmedPhone}\n`;
    if (message.trim()) text += `Pesan tambahan: ${message.trim()}`;

    window.open(waLink(text), "_blank", "noopener");
    setStatus("sent");
  }

  return (
    <div className="rounded-[28px] border border-border bg-white p-6 sm:p-9">
      <h3 className="mb-1 text-xl font-extrabold">Formulir Pemesanan</h3>
      <p className="mb-5 text-sm text-muted">Isi data berikut, lalu kirim pesanan Anda melalui WhatsApp.</p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4">
          <label htmlFor="f-name" className="mb-1.5 block text-sm font-bold">Nama</label>
          <input
            id="f-name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: false }));
            }}
            placeholder="Nama lengkap Anda"
            className={`w-full rounded-[10px] border bg-bg px-3.5 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 ${
              errors.name ? "border-red-600" : "border-border"
            }`}
          />
          {errors.name && <p className="mt-1.5 text-xs font-semibold text-red-600">Mohon isi nama Anda.</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="f-phone" className="mb-1.5 block text-sm font-bold">Nomor WhatsApp</label>
          <input
            id="f-phone"
            type="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (errors.phone) setErrors((prev) => ({ ...prev, phone: false }));
            }}
            placeholder="Contoh: 0858-xxxx-xxxx"
            className={`w-full rounded-[10px] border bg-bg px-3.5 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 ${
              errors.phone ? "border-red-600" : "border-border"
            }`}
          />
          {errors.phone && <p className="mt-1.5 text-xs font-semibold text-red-600">Mohon isi nomor WhatsApp Anda.</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="f-product" className="mb-1.5 block text-sm font-bold">Produk</label>
          <select
            id="f-product"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className="w-full rounded-[10px] border border-border bg-bg px-3.5 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
          >
            <option value="">— Pilih produk —</option>
            {productOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
            <option value="Lainnya / Beberapa Produk">Lainnya / Beberapa Produk</option>
          </select>
        </div>

        <div className="mb-5">
          <label htmlFor="f-message" className="mb-1.5 block text-sm font-bold">Catatan Tambahan</label>
          <textarea
            id="f-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tuliskan jumlah pesanan atau catatan lainnya."
            rows={4}
            className="w-full resize-y rounded-[10px] border border-border bg-bg px-3.5 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp py-3.5 font-bold text-white transition hover:bg-whatsapp-600 disabled:opacity-70"
        >
          <IconWhatsApp className="size-[19px]" />
          {status === "sending" ? "Mengirim..." : "Kirim via WhatsApp"}
        </button>
        {status === "sent" && (
          <p className="mt-3 text-center text-sm font-semibold text-primary">
            Pesan siap dikirim — WhatsApp terbuka di tab baru.
          </p>
        )}
      </form>
    </div>
  );
}
