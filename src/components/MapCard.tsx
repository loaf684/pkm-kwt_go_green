import { IconPin } from "@/components/icons";
import SiteMedia from "@/components/SiteMedia";
import { toGoogleMapsEmbedSrc } from "@/lib/maps";

function AbstractMapIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <rect width="400" height="260" fill="#eef3ea" />
      <path d="M0 60h400M0 130h400M0 190h400" stroke="#d9e2d1" strokeWidth={6} />
      <path d="M60 0v260M180 0v260M300 0v260" stroke="#d9e2d1" strokeWidth={6} />
      <rect x="70" y="70" width="80" height="50" rx="6" fill="#dbe8d4" />
      <rect x="220" y="140" width="90" height="60" rx="6" fill="#dbe8d4" />
      <circle cx="200" cy="120" r="55" fill="#cfe6ce" opacity=".7" />
    </svg>
  );
}

export default function MapCard({ imageUrl, mapQuery }: { imageUrl?: string; mapQuery?: string }) {
  const embedSrc = mapQuery ? toGoogleMapsEmbedSrc(mapQuery) : null;

  return (
    <div className="relative mt-10 aspect-[16/10] min-h-[230px] overflow-hidden rounded-[28px] border border-border shadow-sm">
      {embedSrc ? (
        <iframe
          src={embedSrc}
          className="size-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Peta lokasi Kelompok Wanita Tani"
        />
      ) : (
        <>
          <SiteMedia url={imageUrl} fallback={AbstractMapIllustration} className="size-full object-cover" />
          <IconPin className="absolute left-1/2 top-1/2 size-[34px] -translate-x-1/2 -translate-y-full text-primary drop-shadow" />
        </>
      )}
    </div>
  );
}
