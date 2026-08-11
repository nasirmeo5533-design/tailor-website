import type { ReactNode } from "react";

import Link from "next/link";

import { business, waMessages } from "@/lib/site";
import { waLink } from "@/lib/utils";

const serviceLinks = [
  { label: "Stitching", href: "/services/stitching" },
  { label: "Alterations", href: "/services/alterations" },
  { label: "Finishing", href: "/services/finishing" },
  { label: "Repairs", href: "/services/repairs" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms" },
  { label: "Booking Policy", href: "/booking-policy" },
];

function FooterHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-sm font-semibold uppercase tracking-widest text-cream/50">
      {children}
    </h2>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-cream/70 transition-colors hover:border-brass-500 hover:text-brass-500"
    >
      {children}
    </a>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M16.6 3c.2 2.3 1.5 3.6 3.8 3.8v3c-1.4.1-2.7-.4-3.8-1.2v5.1c0 3.4-2.2 5.8-5.5 5.8-3 0-5.4-2.3-5.4-5.3 0-3.1 2.4-5.5 5.4-5.6v3.1c-1.3.1-2.3 1.1-2.3 2.5 0 1.5 1.1 2.6 2.6 2.6s2.6-1.2 2.6-3V3h3z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-pine-900 text-cream/75">
      <div className="container-site py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="font-display text-2xl font-semibold text-white">{business.name}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed">{business.description}</p>
          </div>
          <div>
            <FooterHeading>Services</FooterHeading>
            <ul className="mt-4 space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <FooterHeading>Contact</FooterHeading>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li className="leading-relaxed">{business.address}</li>
              <li>
                <a href={`tel:${business.phone}`} className="transition-colors hover:text-white">
                  {business.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={waLink(business.whatsapp, waMessages.general)}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-white"
                >
                  {business.whatsappDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${business.email}`} className="transition-colors hover:text-white">
                  {business.email}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <FooterHeading>Hours</FooterHeading>
            <ul className="mt-4 space-y-3 text-sm">
              {business.hours.map((slot) => (
                <li key={slot.days}>
                  <p className="text-cream/90">{slot.days}</p>
                  <p className="mt-0.5">{slot.time}</p>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex gap-3">
              <SocialLink href={business.socials.facebook} label="Facebook">
                <FacebookIcon />
              </SocialLink>
              <SocialLink href={business.socials.instagram} label="Instagram">
                <InstagramIcon />
              </SocialLink>
              <SocialLink href={business.socials.tiktok} label="TikTok">
                <TikTokIcon />
              </SocialLink>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-cream/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {business.name}
          </p>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-cream/90">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
