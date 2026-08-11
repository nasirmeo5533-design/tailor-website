/**
 * Central business configuration.
 *
 * Every user-facing detail of the business lives here (or is overridable via
 * NEXT_PUBLIC_* environment variables at build time). Update this file — or the
 * env vars — to change the contact details across the entire site.
 */

const env: Record<string, string | undefined> =
  typeof process !== "undefined" ? (process.env as Record<string, string | undefined>) : {};

export const business = {
  /** Public business name. */
  name: env.NEXT_PUBLIC_BUSINESS_NAME || "Abid Ali Tailors",
  /** Longer legal-style name used in structured data. */
  legalName: env.NEXT_PUBLIC_BUSINESS_NAME || "Abid Ali Tailors",
  tagline: "Women's Tailoring, Alterations & Finishing in Karachi",
  description:
    "A professional ladies tailoring workshop in Karachi specialising in women's stitching, clothing alterations, piko, overlocking and garment finishing. Visit our shop or order on WhatsApp.",

  /** E.164 format required by wa.me */
  whatsapp: env.NEXT_PUBLIC_BUSINESS_WHATSAPP || "+923001234567",
  whatsappDisplay: env.NEXT_PUBLIC_BUSINESS_PHONE_DISPLAY || "0300-1234567",

  phone: env.NEXT_PUBLIC_BUSINESS_PHONE || "+923001234567",
  phoneDisplay: env.NEXT_PUBLIC_BUSINESS_PHONE_DISPLAY || "0300-1234567",

  email: env.NEXT_PUBLIC_BUSINESS_EMAIL || "hello@example.com",

  address: env.NEXT_PUBLIC_BUSINESS_ADDRESS || "Shop 4, Saima Trade Tower, Rashid Minhas Road, Gulshan-e-Iqbal, Karachi",
  area: "Gulshan-e-Iqbal, Karachi",
  city: "Karachi",
  country: "Pakistan",

  /** Google Maps link and embed source. Replace with the real shop pin. */
  mapLink:
    env.NEXT_PUBLIC_BUSINESS_MAP_LINK ||
    "https://www.google.com/maps/search/?api=1&query=Gulshan-e-Iqbal+Karachi",
  mapEmbed:
    env.NEXT_PUBLIC_BUSINESS_MAP_EMBED ||
    "https://www.google.com/maps?q=Gulshan-e-Iqbal%20Karachi&output=embed",

  hours: [
    { days: "Monday – Saturday", time: "10:00 AM – 9:00 PM" },
    { days: "Sunday", time: "12:00 PM – 6:00 PM" },
  ],

  socials: {
    facebook: env.NEXT_PUBLIC_BUSINESS_FACEBOOK || "https://facebook.com/",
    instagram: env.NEXT_PUBLIC_BUSINESS_INSTAGRAM || "https://instagram.com/",
    tiktok: env.NEXT_PUBLIC_BUSINESS_TIKTOK || "https://tiktok.com/",
  },
} as const;

/** Public base URL used for canonical links, sitemap and Open Graph. */
export const siteUrl = (env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

/** Common pre-filled WhatsApp messages used across CTAs. */
export const waMessages = {
  general: "Hello! I would like to book a women's tailoring service.",
  scheduleCall: "Hello! I would like to schedule a consultation call.",
  book: "Hello! I would like to book a tailoring service. Please guide me.",
} as const;
