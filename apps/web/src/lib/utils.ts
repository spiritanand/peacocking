import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Copies the given text to the clipboard.
 * @param text The text to copy to the clipboard.
 * @returns A promise that resolves to a boolean indicating whether the operation was successful.
 */
export async function copyToClipboard(text?: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext && text) {
    // Use the Clipboard API when available and in a secure context
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error("Failed to copy text: ", err);
      return false;
    }
  }

  return false;
}

export function isIndianTimeZone() {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const indianTimeZones = ["Asia/Calcutta", "Asia/Kolkata", "Asia/Delhi"];
  return indianTimeZones.includes(userTimeZone);
}
