"use client";

import { useWhatsAppSettings } from "@/components/WhatsAppSettingsProvider";

export default function WhatsAppNumber() {
  const { displayNumber } = useWhatsAppSettings();
  return <>{displayNumber}</>;
}
