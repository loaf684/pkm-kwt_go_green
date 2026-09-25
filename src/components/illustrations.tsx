import type { SVGProps } from "react";
import type { IconKey } from "@/lib/products";

type IconProps = SVGProps<SVGSVGElement>;

/** Reusable farm landscape used behind the hero and the smaller page banners. */
export function FarmSceneBg(props: IconProps) {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" {...props}>
      <rect width="1600" height="900" fill="#eddaa0" />
      <circle cx="1300" cy="200" r="85" fill="#fbe7ad" />
      <path
        d="M0,540 C300,480 520,580 820,520 C1120,460 1320,540 1600,480 L1600,900 L0,900 Z"
        fill="#4d8a5b"
        opacity=".55"
      />
      <path d="M0,630 C260,580 620,660 900,600 C1200,540 1400,630 1600,580 L1600,900 L0,900 Z" fill="#2f6b41" />
      <path d="M0,690 C300,650 550,720 850,680 C1150,640 1350,700 1600,670 L1600,900 L0,900 Z" fill="#1a4d2e" />
    </svg>
  );
}

/** The larger, warmer version used specifically behind the main homepage hero. */
export function HeroSceneBg(props: IconProps) {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" {...props}>
      <defs>
        <linearGradient id="heroSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbead0" />
          <stop offset="55%" stopColor="#f0d497" />
          <stop offset="100%" stopColor="#bfe0a8" />
        </linearGradient>
        <radialGradient id="heroSun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff6df" />
          <stop offset="100%" stopColor="#f6c85f" stopOpacity="0" />
        </radialGradient>
        <pattern id="heroRows" width="70" height="46" patternUnits="userSpaceOnUse">
          <ellipse cx="16" cy="30" rx="9" ry="16" fill="#2c6b3f" transform="rotate(-14 16 30)" />
          <ellipse cx="46" cy="34" rx="9" ry="17" fill="#245c35" transform="rotate(10 46 34)" />
        </pattern>
      </defs>
      <rect width="1600" height="900" fill="url(#heroSky)" />
      <circle cx="1300" cy="200" r="230" fill="url(#heroSun)" />
      <circle cx="1300" cy="200" r="85" fill="#fbe7ad" />
      <path
        d="M0,540 C300,480 520,580 820,520 C1120,460 1320,540 1600,480 L1600,900 L0,900 Z"
        fill="#4d8a5b"
        opacity=".55"
      />
      <path d="M0,630 C260,580 620,660 900,600 C1200,540 1400,630 1600,580 L1600,900 L0,900 Z" fill="#2f6b41" />
      <rect x="0" y="690" width="1600" height="210" fill="url(#heroRows)" />
      <path d="M0,690 C300,650 550,720 850,680 C1150,640 1350,700 1600,670 L1600,730 L0,730 Z" fill="#1a4d2e" />
    </svg>
  );
}

export function FarmerIllustration(props: IconProps) {
  return (
    <svg viewBox="0 0 300 300" role="img" aria-label="Ilustrasi petani Kelompok Mutiara Tani" {...props}>
      <rect width="300" height="300" fill="#eaf3ec" />
      <circle cx="150" cy="145" r="112" fill="#dcebdf" />
      <path d="M0 228c40-14 80-6 110 6 40 16 90 18 130 0s60-10 60-10v76H0z" fill="#3c7a4a" />
      <circle cx="150" cy="118" r="26" fill="#e7b58c" />
      <path d="M118 106c2-16 14-26 32-26s30 10 32 26c-10-6-40-6-64 0z" fill="#173d24" />
      <path d="M112 106c6-4 20-6 38-6s32 2 38 6l6 14c-14-6-70-6-84 0z" fill="#f2c94c" />
      <path d="M120 166c0-14 14-22 30-22s30 8 30 22v46h-60z" fill="#2f6b41" />
      <path d="M96 212c4-20 16-32 24-32l4 44-30 6z" fill="#2f6b41" />
      <path d="M204 212c-4-20-16-32-24-32l-4 44 30 6z" fill="#356f45" />
      <circle cx="92" cy="220" r="9" fill="#e7b58c" />
      <circle cx="208" cy="220" r="9" fill="#e7b58c" />
    </svg>
  );
}

export function BasketIllustration(props: IconProps) {
  return (
    <svg viewBox="0 0 220 220" role="img" aria-label="Ilustrasi hasil panen segar" {...props}>
      <rect width="220" height="220" fill="#fdf3d7" />
      <path d="M40 112h140l-14 68a14 14 0 01-14 12H68a14 14 0 01-14-12z" fill="#c8863a" />
      <path d="M40 112h140" stroke="#a6692a" strokeWidth={4} />
      <path
        d="M50 112c0-40 22-40 22-40M170 112c0-40-22-40-22-40"
        fill="none"
        stroke="#a6692a"
        strokeWidth={5}
        strokeLinecap="round"
      />
      <circle cx="88" cy="96" r="18" fill="#d8362c" />
      <circle cx="120" cy="90" r="20" fill="#f6c331" />
      <path d="M140 78c10-2 18 6 16 14-10 4-22 0-26-6z" fill="#5a9c3e" />
      <circle cx="150" cy="100" r="14" fill="#6a3f7a" />
    </svg>
  );
}

export function FieldRowsIllustration(props: IconProps) {
  return (
    <svg viewBox="0 0 300 220" role="img" aria-label="Ilustrasi kebun Kelompok Mutiara Tani" {...props}>
      <rect width="300" height="220" fill="#eef6ea" />
      <rect y="150" width="300" height="70" fill="#3c7a4a" />
      <g fill="#6a3f7a">
        <ellipse cx="35" cy="150" rx="16" ry="22" />
        <ellipse cx="90" cy="150" rx="16" ry="22" />
        <ellipse cx="145" cy="150" rx="16" ry="22" />
        <ellipse cx="200" cy="150" rx="16" ry="22" />
        <ellipse cx="255" cy="150" rx="16" ry="22" />
      </g>
      <g fill="#5a9c3e">
        <ellipse cx="35" cy="126" rx="10" ry="14" />
        <ellipse cx="90" cy="126" rx="10" ry="14" />
        <ellipse cx="145" cy="126" rx="10" ry="14" />
        <ellipse cx="200" cy="126" rx="10" ry="14" />
        <ellipse cx="255" cy="126" rx="10" ry="14" />
      </g>
    </svg>
  );
}

function CornIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 200 200" {...props}>
      <circle cx="100" cy="100" r="92" fill="#fdf3d7" />
      <path
        d="M100 40c-20 0-33 16-36 40l-6 46c-3 22 12 42 42 42s45-20 42-42l-6-46c-3-24-16-40-36-40z"
        fill="#f6c331"
      />
      <g fill="#e2a812">
        <circle cx="82" cy="70" r="5" /><circle cx="100" cy="68" r="5" /><circle cx="118" cy="70" r="5" />
        <circle cx="78" cy="86" r="5" /><circle cx="96" cy="84" r="5" /><circle cx="114" cy="86" r="5" /><circle cx="130" cy="88" r="5" />
        <circle cx="76" cy="102" r="5" /><circle cx="94" cy="100" r="5" /><circle cx="112" cy="102" r="5" /><circle cx="128" cy="104" r="5" />
        <circle cx="78" cy="118" r="5" /><circle cx="96" cy="118" r="5" /><circle cx="114" cy="120" r="5" /><circle cx="128" cy="120" r="5" />
        <circle cx="84" cy="134" r="5" /><circle cx="100" cy="134" r="5" /><circle cx="116" cy="134" r="5" />
      </g>
      <path d="M68 62c-16-12-34-10-44 4-8 12-4 26 8 32 6-16 18-28 36-36z" fill="#4c8c3f" />
      <path d="M132 62c16-12 34-10 44 4 8 12 4 26-8 32-6-16-18-28-36-36z" fill="#5da34c" />
    </svg>
  );
}

function CornPaleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 200 200" {...props}>
      <circle cx="100" cy="100" r="92" fill="#f3efe2" />
      <path
        d="M100 40c-20 0-33 16-36 40l-6 46c-3 22 12 42 42 42s45-20 42-42l-6-46c-3-24-16-40-36-40z"
        fill="#f2ecd8"
      />
      <g fill="#d8cba3">
        <circle cx="82" cy="70" r="5" /><circle cx="100" cy="68" r="5" /><circle cx="118" cy="70" r="5" />
        <circle cx="78" cy="86" r="5" /><circle cx="96" cy="84" r="5" /><circle cx="114" cy="86" r="5" /><circle cx="130" cy="88" r="5" />
        <circle cx="76" cy="102" r="5" /><circle cx="94" cy="100" r="5" /><circle cx="112" cy="102" r="5" /><circle cx="128" cy="104" r="5" />
        <circle cx="78" cy="118" r="5" /><circle cx="96" cy="118" r="5" /><circle cx="114" cy="120" r="5" /><circle cx="128" cy="120" r="5" />
        <circle cx="84" cy="134" r="5" /><circle cx="100" cy="134" r="5" /><circle cx="116" cy="134" r="5" />
      </g>
      <path d="M68 62c-16-12-34-10-44 4-8 12-4 26 8 32 6-16 18-28 36-36z" fill="#4c8c3f" />
      <path d="M132 62c16-12 34-10 44 4 8 12 4 26-8 32-6-16-18-28-36-36z" fill="#5da34c" />
    </svg>
  );
}

function ChiliIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 200 200" {...props}>
      <circle cx="100" cy="100" r="92" fill="#fbe3df" />
      <path
        d="M78 55c6-8 16-10 20-6 3 3 2 9-3 15 22 6 40 26 40 55 0 24-16 38-30 38-20 0-34-20-34-46 0-24 4-42 7-56z"
        fill="#d8362c"
      />
      <path d="M95 44c8-10 22-8 22 2 0 6-6 11-13 14-3-6-6-11-9-16z" fill="#4c8c3f" />
    </svg>
  );
}

function CucumberIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 200 200" {...props}>
      <circle cx="100" cy="100" r="92" fill="#e6f2df" />
      <path
        d="M50 118c-4-26 14-48 46-58 30-9 58 2 66 24 6 18-4 30-22 38-30 13-70 22-84 6-4-4-6-6-6-10z"
        fill="#6fae4a"
      />
      <path d="M62 108c26-16 58-26 84-20" fill="none" stroke="#4c8c3f" strokeWidth={4} strokeLinecap="round" />
      <path
        d="M70 122c22-14 50-24 74-20"
        fill="none"
        stroke="#4c8c3f"
        strokeWidth={3}
        strokeLinecap="round"
        opacity=".6"
      />
    </svg>
  );
}

function BokChoyIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 200 200" {...props}>
      <circle cx="100" cy="100" r="92" fill="#e9f4e2" />
      <path
        d="M100 152c-30 0-46-24-40-50 3-14 12-8 16 4 2-16 10-28 20-34 2 16 8 26 4 40 8-10 18-16 30-16 4 14-4 26-14 34 10-2 20 0 26 8-8 12-24 14-42 14z"
        fill="#5a9c3e"
      />
      <path d="M100 152c0-20 4-38 12-52" fill="none" stroke="#3f7a2a" strokeWidth={3} strokeLinecap="round" opacity=".7" />
    </svg>
  );
}

function EggplantIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 200 200" {...props}>
      <circle cx="100" cy="100" r="92" fill="#efe3f2" />
      <path d="M100 60c18 0 32 18 32 46 0 26-14 46-32 46s-32-20-32-46c0-28 14-46 32-46z" fill="#6a3f7a" />
      <path
        d="M84 52c-4-8-2-16 4-18 5-2 9 3 10 9 4-3 10-3 13 1 4 5 1 12-4 15-6-4-15-6-23-7z"
        fill="#4c8c3f"
      />
    </svg>
  );
}

function LeafIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 200 200" {...props}>
      <circle cx="100" cy="100" r="92" fill="#eaf3ec" />
      <path
        d="M100 152c-28 0-48-20-48-48 0-30 22-52 52-56 26-3 46 3 46 3s-4 34-24 54c-14 14-26 20-26 20v27z"
        fill="#3f7a2a"
      />
      <path d="M100 152c4-24 14-44 30-58" fill="none" stroke="#2c5c1f" strokeWidth={3} strokeLinecap="round" opacity=".6" />
    </svg>
  );
}

export const PRODUCT_ICONS: Record<IconKey, (props: IconProps) => React.JSX.Element> = {
  corn: CornIcon,
  cornpale: CornPaleIcon,
  chili: ChiliIcon,
  cucumber: CucumberIcon,
  bokchoy: BokChoyIcon,
  eggplant: EggplantIcon,
  leaf: LeafIcon,
};
