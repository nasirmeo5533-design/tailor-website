import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type StatusMessageProps = {
  variant: "success" | "error" | "info";
  children: ReactNode;
  className?: string;
};

const variantStyles = {
  success: {
    wrapper: "border-pine-300 bg-pine-50 text-pine-800",
    role: "status" as const,
  },
  error: {
    wrapper: "border-red-300 bg-red-50 text-red-800",
    role: "alert" as const,
  },
  info: {
    wrapper: "border-brass-300 bg-brass-200/40 text-ink",
    role: "status" as const,
  },
};

function SuccessIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="mt-0.5 h-5 w-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M 8.5 12.5 l 2.5 2.5 4.5 -5.5" />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="mt-0.5 h-5 w-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M 12 4.5 L 21.5 19.5 H 2.5 Z" />
      <path d="M 12 10.5 v 4" />
      <circle cx="12" cy="17" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="mt-0.5 h-5 w-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="8" r="0.6" fill="currentColor" stroke="none" />
      <path d="M 12 11 v 5" />
    </svg>
  );
}

export function StatusMessage({ variant, children, className }: StatusMessageProps) {
  const { wrapper, role } = variantStyles[variant];

  return (
    <div
      role={role}
      className={cn(
        "flex items-start gap-3 rounded-xl border p-4 text-sm",
        wrapper,
        className,
      )}
    >
      {variant === "success" ? (
        <SuccessIcon />
      ) : variant === "error" ? (
        <ErrorIcon />
      ) : (
        <InfoIcon />
      )}
      <div>{children}</div>
    </div>
  );
}
