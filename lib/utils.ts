export type ClassValue = string | number | false | null | undefined;

/** Join truthy class names with a space (no external dependency needed). */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}

/** Strip everything except digits from a phone number (E.164-safe). */
export function toE164(phone: string): string {
  return phone.replace(/\D/g, "");
}

/** Build a wa.me link, pre-filling the message when provided. */
export function waLink(phone: string, message?: string): string {
  const number = toE164(phone);
  const base = `https://wa.me/${number}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/** Format a starting price, e.g. 2500 -> "Rs. 2,500". Null renders as "Ask for quote". */
export function formatPrice(price: number | null): string {
  if (price === null) return "Quote on request";
  return `Rs. ${price.toLocaleString("en-PK")}`;
}

/** Build a URL query string from a record. */
export function toQuery(params: Record<string, string | number | boolean | undefined>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === "") continue;
    search.set(key, String(value));
  }
  const str = search.toString();
  return str ? `?${str}` : "";
}
