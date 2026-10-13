import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { WhatsAppSettingsProvider } from "@/components/WhatsAppSettingsProvider";
import { getSiteImages, getWhatsAppSettings } from "@/lib/db/queries";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [images, whatsappSettings] = await Promise.all([getSiteImages(), getWhatsAppSettings()]);

  return (
    <WhatsAppSettingsProvider settings={whatsappSettings}>
      <Header logoUrl={images.logo} />
      <main className="min-w-0 w-screen flex-1 overflow-x-clip">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </WhatsAppSettingsProvider>
  );
}
