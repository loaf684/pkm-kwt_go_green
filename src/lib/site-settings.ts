export const WHATSAPP_NUMBER_KEY = "whatsapp_number";
export const WHATSAPP_DISPLAY_NUMBER_KEY = "whatsapp_display_number";

export interface WhatsAppSettings {
  phoneNumber: string;
  displayNumber: string;
}

export const DEFAULT_WHATSAPP_SETTINGS: WhatsAppSettings = {
  phoneNumber: "",
  displayNumber: "Nomor belum diatur",
};
