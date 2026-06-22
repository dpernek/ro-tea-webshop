"use client";

import { Minus, Plus } from "lucide-react";

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}) {
  const setValue = (nextValue: number) => onChange(Math.min(max, Math.max(min, nextValue)));

  return (
    <div className="inline-grid h-11 grid-cols-[44px_56px_44px] overflow-hidden rounded-md border border-slate-200 bg-white">
      <button
        aria-label="Smanji količinu"
        className="grid place-items-center text-slate-600 transition hover:bg-slate-50 hover:text-slate-950 disabled:opacity-40"
        disabled={value <= min}
        onClick={() => setValue(value - 1)}
        type="button"
      >
        <Minus aria-hidden="true" size={16} />
      </button>
      <span className="grid place-items-center border-x border-slate-200 text-sm font-semibold text-slate-950">
        {value}
      </span>
      <button
        aria-label="Povećaj količinu"
        className="grid place-items-center text-slate-600 transition hover:bg-slate-50 hover:text-slate-950 disabled:opacity-40"
        disabled={value >= max}
        onClick={() => setValue(value + 1)}
        type="button"
      >
        <Plus aria-hidden="true" size={16} />
      </button>
    </div>
  );
}
