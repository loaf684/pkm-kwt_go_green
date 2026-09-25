import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSiteImages } from "@/lib/db/queries";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const images = await getSiteImages();

  return (
    <>
      <Header logoUrl={images.logo} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
