"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { WhatsAppSettings } from "@/lib/site-settings";

const WhatsAppSettingsContext = createContext<WhatsAppSettings>({
  phoneNumber: "",
  displayNumber: "Nomor belum diatur",
});

export function WhatsAppSettingsProvider({
  settings,
  children,
}: {
  settings: WhatsAppSettings;
  children: ReactNode;
}) {
  return (
    <WhatsAppSettingsContext.Provider value={settings}>
      {children}
    </WhatsAppSettingsContext.Provider>
  );
}

export function useWhatsAppSettings() {
  return useContext(WhatsAppSettingsContext);
}
