import Link from "next/link";
import { FarmSceneBg } from "@/components/illustrations";
import SiteMedia from "@/components/SiteMedia";

export default function PageBanner({
  crumb,
  title,
  text,
  bgUrl,
}: {
  crumb: string;
  title: string;
  text: string;
  bgUrl?: string;
}) {
  return (
    <section className="relative flex min-h-[300px] items-center overflow-hidden text-white">
      <SiteMedia url={bgUrl} fallback={FarmSceneBg} className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-[#0a160e]/70" />
      <div className="relative mx-auto max-w-[1180px] px-6 py-14">
        <div className="mb-3.5 text-sm font-semibold text-white/75">
          <Link href="/" className="hover:underline">Beranda</Link> / {crumb}
        </div>
        <h1 className="text-[clamp(1.9rem,4vw,2.8rem)] font-extrabold tracking-tight">{title}</h1>
        <p className="mt-3 max-w-xl text-white/85">{text}</p>
      </div>
    </section>
  );
}
