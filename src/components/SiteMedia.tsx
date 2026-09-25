import type { ComponentType, SVGProps } from "react";

export default function SiteMedia({
  url,
  fallback: Fallback,
  className,
  alt = "",
}: {
  url?: string | null;
  fallback: ComponentType<SVGProps<SVGSVGElement>>;
  className?: string;
  alt?: string;
}) {
  if (url) {
    return (
      // Admin-provided URLs can be any external host, so next/image's
      // remote-pattern allowlist doesn't fit here — see ProductImage.tsx.
      // eslint-disable-next-line @next/next/no-img-element
      <img src={url} alt={alt} className={className} />
    );
  }
  return <Fallback className={className} />;
}
