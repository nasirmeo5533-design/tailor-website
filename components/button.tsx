import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "brass" | "outline" | "white" | "whatsapp";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  className?: string;
  children: ReactNode;
} & ComponentProps<"a"> &
  ComponentProps<"button">;

const variantClasses: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  brass: "btn-brass",
  outline: "btn-outline",
  white: "btn-white",
  whatsapp: "btn-whatsapp",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "btn-sm",
  md: "btn-md",
  lg: "btn-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn("btn", variantClasses[variant], sizeClasses[size], className);

  if (href) {
    return (
      <a href={href} className={classes} {...(props as ComponentProps<"a">)}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...(props as ComponentProps<"button">)}>
      {children}
    </button>
  );
}
