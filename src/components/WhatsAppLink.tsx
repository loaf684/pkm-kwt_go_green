"use client";

import type { ReactNode } from "react";
import { useWhatsAppSettings } from "@/components/WhatsAppSettingsProvider";
import { WA_GENERAL_TEXT, waLink } from "@/lib/products";

export default function WhatsAppLink({
  children,
  className,
  ariaLabel,
  message = WA_GENERAL_TEXT,
}: {
  children: ReactNode;
  className: string;
  ariaLabel?: string;
  message?: string;
}) {
  const { phoneNumber } = useWhatsAppSettings();

  if (!phoneNumber) {
    return (
      <span
        className={`${className} cursor-not-allowed opacity-60`}
        aria-disabled="true"
        aria-label={ariaLabel}
        title="Nomor WhatsApp belum diatur oleh admin."
      >
        {children}
      </span>
    );
  }

  return (
    <a
      href={waLink(message, phoneNumber)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
