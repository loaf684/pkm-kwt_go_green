import { IconWhatsApp } from "@/components/icons";
import WhatsAppLink from "@/components/WhatsAppLink";

export default function FloatingWhatsApp() {
  return (
    <WhatsAppLink
      ariaLabel="Hubungi KWT Go Green Griya Asri melalui WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_10px_30px_rgba(37,211,102,0.35)] transition duration-300 hover:-translate-y-1 hover:bg-whatsapp-600 hover:shadow-xl sm:bottom-7 sm:right-7"
    >
      <IconWhatsApp className="size-7" />
      <span className="absolute inset-0 rounded-full border-2 border-white/35 animate-ping [animation-duration:2.8s]" />
    </WhatsAppLink>
  );
}
