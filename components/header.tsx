"use client";

import { useState } from "react";

import Link from "next/link";

import { Logo } from "@/components/logo";
import { ServiceIcon } from "@/components/service-icon";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { business, waMessages } from "@/lib/site";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-cream/90 backdrop-blur">
      <div className="container-site flex items-center justify-between py-3 sm:py-4">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-pine-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <WhatsAppButton
            size="sm"
            message={waMessages.general}
            className="hidden sm:inline-flex"
          />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            onKeyDown={(event) => {
              if (event.key === "Escape") setOpen(false);
            }}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5 md:hidden"
          >
            <ServiceIcon name={open ? "close" : "menu"} className="h-5 w-5" />
          </button>
        </div>
      </div>
      {open ? (
        <div className="absolute inset-x-0 top-full border-b border-ink/10 bg-cream shadow-soft md:hidden">
          <nav className="container-site py-4" aria-label="Mobile">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-3 text-base font-medium text-ink transition-colors hover:bg-sand hover:text-pine-700"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div
              className="mt-3 flex flex-col gap-3 border-t border-ink/10 pt-4"
              onClick={() => setOpen(false)}
            >
              <WhatsAppButton size="md" message={waMessages.general} className="w-full" />
              <a
                href={`tel:${business.phone}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-pine-600 hover:text-pine-700"
              >
                <ServiceIcon name="phone" className="h-4 w-4" />
                {business.phoneDisplay}
              </a>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
