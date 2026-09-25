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
      <div className="absolute bottom-4 left-4 max-w-[260px] rounded-2xl bg-white p-4 shadow-lg">
        <strong className="block text-[0.98rem]">Jalan Siwa </strong>
        <span className="mb-3 block text-sm text-muted">Tolitoli, Sulawesi Tengah</span>
        <a
          href="https://www.google.com/maps/place/GREEN+HOUSE/@-6.2697467,106.6690595,3a,15y,13.65h,90.97t/data=!3m7!1e1!3m5!1s75HT4LX1eMoREQe7oPMqtQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-0.9699999999999989%26panoid%3D75HT4LX1eMoREQe7oPMqtQ%26yaw%3D13.65!7i16384!8i8192!4m7!3m6!1s0x2e69fb003cacb3f5:0xf0b546e4a33d9b34!8m2!3d-6.2697071!4d106.669065!10e5!16s%2Fg%2F11ld42h9hs?entry=ttu&g_ep=EgoyMDI2MDkyMi4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary-600"
        >
          Buka di Google Maps
        </a>
      </div>
    </div>
  );
}
