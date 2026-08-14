import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ServiceIconProps = {
  name: string;
  className?: string;
};

const icons: Record<string, ReactNode> = {
  scissors: (
    <>
      <circle cx="5.5" cy="6.5" r="2.2" />
      <circle cx="5.5" cy="17.5" r="2.2" />
      <path d="M 7.4 7.9 L 19 12 M 7.4 16.1 L 19 12" />
    </>
  ),
  ruler: (
    <>
      <path d="M 3.5 20.5 L 20.5 3.5 L 22 5 L 5 21.5 Z" />
      <path d="M 9 14.5 L 10 15.5 M 13 10.5 L 14 11.5 M 16.5 7 L 17.5 8" />
    </>
  ),
  hem: (
    <>
      <path d="M 5 19 L 16 5" />
      <path d="M 8.5 15.3 l 1.8 -1.8 l 1.8 1.8 l 1.8 -1.8 l 1.8 1.8" />
    </>
  ),
  thread: (
    <>
      <circle cx="10.5" cy="11" r="1.3" />
      <path d="M 10.5 12.3 L 4.5 18.5" />
      <path d="M 16 5 h 4 M 16 19 h 4 M 17 5 v 14 M 19 5 v 14" />
      <path d="M 16 9 H 12.5 a 2 2 0 0 0 -2 2" />
    </>
  ),
  machine: (
    <>
      <path d="M 3.5 18.5 h 17" />
      <path d="M 6 18.5 v -7.5 a 3.5 3.5 0 0 1 3.5 -3.5 h 2.5" />
      <path d="M 12 7.5 v -1" />
      <path d="M 11.5 6.5 h 5.5" />
      <path d="M 17 6.5 v 5" />
      <path d="M 17 11.5 l -2.3 7" />
      <circle cx="16.8" cy="3.6" r="1.2" />
    </>
  ),
  sparkle: <path d="M 12 2.5 L 14.6 9.4 L 21.5 12 L 14.6 14.6 L 12 21.5 L 9.4 14.6 L 2.5 12 L 9.4 9.4 Z" />,
  shield: <path d="M 12 3.5 l 7 2.5 v 5.5 c 0 4.2 -3.2 7.2 -7 8.5 c -3.8 -1.3 -7 -4.3 -7 -8.5 V 6 Z" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M 12 7.5 V 12 l 3.2 2.2" />
    </>
  ),
  truck: (
    <>
      <path d="M 15.5 18 V 6.8 a 1.6 1.6 0 0 0 -1.6 -1.6 H 3.6 A 1.6 1.6 0 0 0 2 6.8 v 9.6 a 1.6 1.6 0 0 0 1.6 1.6 H 4.5" />
      <path d="M 15.5 10.5 h 2.8 a 1.6 1.6 0 0 1 1.15 0.48 l 2.4 2.4 a 1.6 1.6 0 0 1 0.47 1.13 v 1.4 a 1.6 1.6 0 0 1 -1.6 1.6 h -1.4" />
      <circle cx="7" cy="18" r="1.9" />
      <circle cx="16.8" cy="18" r="1.9" />
    </>
  ),
  chat: <path d="M 12 3.2 c -5 0 -9 3.4 -9 7.6 c 0 2.3 1.2 4.4 3.2 5.8 l -0.8 3.2 3.7 -1.7 c 0.9 0.3 1.9 0.5 2.9 0.5 c 5 0 9 -3.4 9 -7.8 s -4 -7.6 -9 -7.6 Z" />,
  phone: (
    <path d="M 22 16.92 v 3 a 2 2 0 0 1 -2.18 2 19.79 19.79 0 0 1 -8.63 -3.07 19.5 19.5 0 0 1 -6 -6 19.79 19.79 0 0 1 -3.07 -8.67 A 2 2 0 0 1 4.11 2 h 3 a 2 2 0 0 1 2 1.72 c 0.127 0.96 0.361 1.903 0.7 2.81 a 2 2 0 0 1 -0.45 2.11 L 8.09 9.91 a 16 16 0 0 0 6 6 l 1.27 -1.27 a 2 2 0 0 1 2.11 -0.45 c 0.907 0.339 1.85 0.573 2.81 0.7 A 2 2 0 0 1 22 16.92 Z" />
  ),
  pin: (
    <>
      <path d="M 12 21.5 c -4 -5 -7.5 -8.4 -7.5 -12 a 7.5 7.5 0 0 1 15 0 c 0 3.6 -3.5 7 -7.5 12 Z" />
      <circle cx="12" cy="9" r="2.6" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M 3.5 7 l 8.5 6.2 8.5 -6.2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5.5" width="17" height="15" rx="2" />
      <path d="M 3.5 9.5 h 17 M 8.5 3.5 v 4 M 15.5 3.5 v 4" />
    </>
  ),
  check: <path d="M 5 12.5 l 4.5 4.5 L 19 7" />,
  star: (
    <path
      fill="currentColor"
      stroke="none"
      d="M 12 2.5 l 2.9 6.1 6.6 0.9 -4.8 4.6 1.2 6.4 -5.9 -3.2 -5.9 3.2 1.2 -6.4 -4.8 -4.6 6.6 -0.9 Z"
    />
  ),
  "arrow-right": <path d="M 4.5 12 h 14 M 13.5 6.5 l 5 5.5 -5 5.5" />,
  menu: <path d="M 4 7 h 16 M 4 12 h 16 M 4 17 h 16" />,
  close: <path d="M 6 6 l 12 12 M 18 6 l -12 12" />,
  fabric: (
    <>
      <path d="M 4 8 l 6 3 6 -3 4 2 v 9 a 1.6 1.6 0 0 1 -1.6 1.6 H 5.6 A 1.6 1.6 0 0 1 4 19 Z" />
      <path d="M 4 11 l 6 3 6 -3" />
      <path d="M 10 11 v 9" />
    </>
  ),
  palette: (
    <>
      <path d="M 12 3.5 a 8.5 8.5 0 1 0 0 17 h 1 a 2 2 0 0 0 1.5 -3.3 a 2 2 0 0 1 1.5 -3.3 H 18 a 2.5 2.5 0 0 0 2.5 -2.5 C 20.5 7.6 16.7 3.5 12 3.5 Z" />
      <circle cx="7.5" cy="11.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="10.5" cy="7.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="7.5" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  upload: (
    <>
      <path d="M 12 16.5 V 4.5 M 7.5 9 L 12 4.5 L 16.5 9" />
      <path d="M 5 20.5 h 14" />
    </>
  ),
  pencil: (
    <>
      <path d="M 4 20 l 0.9 -4.2 11.2 -11.2 a 1.4 1.4 0 0 1 2 0 l 1.3 1.3 a 1.4 1.4 0 0 1 0 2 L 8.2 19.1 Z" />
      <path d="M 13.5 6.5 l 4 4" />
    </>
  ),
};

export function ServiceIcon({ name, className }: ServiceIconProps) {
  const icon = icons[name] ?? icons.sparkle;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("h-6 w-6", className)}
    >
      {icon}
    </svg>
  );
}
