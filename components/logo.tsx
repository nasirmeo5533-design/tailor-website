import Link from "next/link";

import { business } from "@/lib/site";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
};

const nameWords = business.name.trim().split(/\s+/);
const hasSuffix = nameWords.length > 1;
const brand = hasSuffix ? nameWords.slice(0, -1).join(" ") : nameWords[0] ?? "Abid Ali";
const suffix = hasSuffix ? nameWords[nameWords.length - 1] : "";

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" aria-label={business.name} className={cn("inline-flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 40 40" className="h-10 w-10 shrink-0" aria-hidden="true">
        <rect x="1" y="1" width="38" height="38" rx="12" className="fill-pine-600" />
        <circle cx="22.5" cy="14" r="1.9" className="fill-none stroke-cream" strokeWidth="1.5" />
        <path
          d="M 22.5 14 C 27 9, 34 10.5, 32.5 15.5 C 31.5 19, 26.5 18, 27.5 14"
          className="fill-none stroke-cream"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M 22.5 16 L 12.5 26"
          className="fill-none stroke-cream"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M 14 24.5 L 11.5 27"
          className="fill-none stroke-cream"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-semibold text-ink">{brand}</span>
        {suffix ? (
          <span className="mt-1 text-[0.625rem] font-semibold uppercase tracking-[0.22em] text-brass-600">
            {suffix}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
