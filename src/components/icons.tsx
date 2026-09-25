import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function IconShield(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinejoin="round" strokeLinecap="round" {...props}>
      <path d="M24 5l14 5v11c0 10-6.5 17.5-14 21-7.5-3.5-14-11-14-21V10z" />
      <path d="M17 24l5 5 10-11" />
    </svg>
  );
}

export function IconTag(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinejoin="round" strokeLinecap="round" {...props}>
      <path d="M6 6h16l20 20-16 16L6 22V6z" />
      <circle cx="15" cy="15" r="3" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconChat(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinejoin="round" strokeLinecap="round" {...props}>
      <path d="M24 6C14 6 6 13.8 6 23.4c0 4 1.4 7.7 3.8 10.7L8 42l8.3-2.7c2.4 1.3 5.1 2 8 2 10 0 18-7.8 18-17.6S34 6 24 6z" />
      <path
        d="M18.5 19c-.9 0-1.7.9-1.7 2.2 0 4.4 4.9 10.2 9.6 10.6 1.4.1 2.5-.9 2.5-1.8 0-.3-.1-.5-.3-.8l-2.1-1.8c-.3-.3-.8-.2-1 .1l-.8.9c-1.5-.8-2.9-2.2-3.7-3.7l.9-.8c.3-.3.4-.7.1-1l-1.8-2.4c-.2-.3-.4-.5-.7-.5z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

export function IconPeople(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinejoin="round" strokeLinecap="round" {...props}>
      <circle cx="17" cy="16" r="6" />
      <circle cx="32" cy="18" r="5" />
      <path d="M6 40c0-7 5-11 11-11s11 4 11 11" />
      <path d="M27 30c5 0 9 3.5 9 10" />
    </svg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="12" r="11" className="fill-primary-50" />
      <path d="M7 12.5l3 3 7-7" className="stroke-primary" strokeWidth={2.2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconPin(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2C7.6 2 4 5.6 4 10c0 6 8 12 8 12s8-6 8-12c0-4.4-3.6-8-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z" />
    </svg>
  );
}

export function IconMail(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M4 6.5l8 6.2 8-6.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" {...props}>
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

export function IconClose(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" {...props}>
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
  );
}

export function IconSearch(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16" y2="16" strokeLinecap="round" />
    </svg>
  );
}

export function IconChevronDown(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 8l7 7 7-7" />
    </svg>
  );
}

export function IconWhatsApp(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 3a9 9 0 00-7.8 13.5L3 21l4.6-1.2A9 9 0 1012 3zm0 1.8a7.2 7.2 0 016 11.2l-.3.5.6 2.2-2.2-.6-.5.3A7.2 7.2 0 1112 4.8zm-3.2 3.4c-.2 0-.5 0-.7.4-.2.4-.9 1-.9 2.3s1 2.7 1.1 2.9c.1.2 2 3.1 4.8 4.2 2.4.9 2.7.7 3.2.7.5 0 1.6-.7 1.9-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.4l-2-1c-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.4-1.5-.9-.8-1.5-1.8-1.6-2.1-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6-.1-.2-.7-1.8-1-2.4-.2-.6-.5-.5-.7-.5h-.6z" />
    </svg>
  );
}
