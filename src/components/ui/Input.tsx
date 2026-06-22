import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type InputProps = ComponentPropsWithoutRef<"input"> & {
  label: string;
  error?: string;
};

export function Input({ label, error, className, id, ...props }: InputProps) {
  const inputId = id ?? props.name;

  return (
    <label className="block" htmlFor={inputId}>
      <span className="mb-2 block text-sm font-semibold text-slate-800">{label}</span>
      <input
        className={cn(
          "h-12 w-full rounded-md border border-slate-200 bg-white px-4 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#0055a8] focus:ring-4 focus:ring-[#0055a8]/10",
          error && "border-red-400 focus:border-red-500 focus:ring-red-100",
          className,
        )}
        id={inputId}
        {...props}
      />
      {error ? <span className="mt-2 block text-sm text-red-600">{error}</span> : null}
    </label>
  );
}
