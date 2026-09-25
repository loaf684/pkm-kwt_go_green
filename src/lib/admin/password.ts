import { timingSafeEqual } from "node:crypto";

/**
 * Explicitly rejects the placeholder shipped in .env.example so the admin
 * can't accidentally go live unsecured, then does a constant-time compare.
 */
export function checkAdminPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || expected === "change-me-now" || expected.length < 4) {
    throw new Error(
      "ADMIN_PASSWORD is not set to a real value yet. Edit .env.local before logging in."
    );
  }
  const a = Buffer.from(input.padEnd(64, "\0"));
  const b = Buffer.from(expected.padEnd(64, "\0"));
  return input.length === expected.length && timingSafeEqual(a, b);
}
