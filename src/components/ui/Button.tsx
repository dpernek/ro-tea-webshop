import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "dark";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
  onClick?: () => void;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[#0055a8] text-white shadow-[0_16px_40px_rgba(0,85,168,0.24)] hover:bg-[#004784] focus-visible:outline-[#0055a8]",
  secondary:
    "border border-slate-200 bg-white text-slate-950 hover:border-[#0055a8]/50 hover:text-[#0055a8] focus-visible:outline-[#0055a8]",
  ghost:
    "text-slate-700 hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-[#0055a8]",
  dark: "bg-slate-950 text-white hover:bg-slate-800 focus-visible:outline-slate-950",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export function Button({
  children,
  href,
  type = "button",
  variant = "primary",
  size = "md",
  className,
  disabled,
  ariaLabel,
  onClick,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if (href) {
    return (
      <Link aria-label={ariaLabel} className={classes} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button
      aria-label={ariaLabel}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
