export const MAP_LOCATION =
  "PMJ9+4J8 GREEN HOUSE, Jl. Perumahan Griya Asri, Jelupang, Kec. Serpong Utara, Kota Tangerang Selatan, Banten 15323";
export const MAP_LINK = "https://maps.app.goo.gl/so9pA99vRL7UyLjK8?g_st=aw";

/**
 * Turns whatever an admin typed — a plain address, a place name, or a full
 * Google Maps link they copied from their browser — into a URL that can be
 * embedded in an <iframe>, using Google's no-API-key "output=embed" form.
 * Returns null if the input can't be turned into a safe Google Maps embed
 * (e.g. it's some other, unrelated URL).
 */
export function toGoogleMapsEmbedSrc(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  if (/^https?:\/\//i.test(trimmed)) {
    let url: URL;
    try {
      url = new URL(trimmed);
    } catch {
      return null;
    }

    const isGoogleMapsHost =
      /(^|\.)google\.[a-z.]+$/i.test(url.hostname) && url.pathname.includes("/maps");
    const isShortLink = /^(goo\.gl|maps\.app\.goo\.gl)$/i.test(url.hostname);
    if (!isGoogleMapsHost && !isShortLink) {
      // Not a Google Maps URL — refuse rather than iframe an arbitrary site.
      return null;
    }
    if (isShortLink) {
      return `https://www.google.com/maps?q=${encodeURIComponent(MAP_LOCATION)}&output=embed`;
    }

    // A link copied while looking at a spot on the map usually has @lat,lng.
    const coordMatch = trimmed.match(/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/);
    if (coordMatch) {
      return `https://www.google.com/maps?q=${coordMatch[1]},${coordMatch[2]}&output=embed`;
    }
    // Or it may already carry a place/address in its own q= param.
    const q = url.searchParams.get("q");
    if (q) {
      return `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;
    }
    // Fall back to just asking Google to embed that exact URL.
    url.searchParams.set("output", "embed");
    return url.toString();
  }

  // Plain text: treat it as an address, place name, or "lat,lng" pair.
  return `https://www.google.com/maps?q=${encodeURIComponent(trimmed)}&output=embed`;
}
