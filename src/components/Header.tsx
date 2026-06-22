"use client";

import Link from "next/link";
import { Menu, Search, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import site from "@/data/site.json";
import { cn } from "@/lib/cn";
import { getCartCount, useCartStore } from "@/store/cart-store";
import { useHasMounted } from "@/hooks/useHasMounted";
import { Button } from "@/components/ui/Button";

export function Header() {
  const [open, setOpen] = useState(false);
  const mounted = useHasMounted();
  const items = useCartStore((state) => state.items);
  const cartCount = mounted ? getCartCount(items) : 0;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/92 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link className="flex items-center gap-3" href="/" onClick={() => setOpen(false)}>
          <span className="grid size-10 place-items-center rounded-md bg-[#0055a8] text-sm font-black text-white">
            RT
          </span>
          <span className="leading-tight">
            <span className="block text-lg font-black tracking-normal text-slate-950">
              {site.brand.name}
            </span>
            <span className="hidden text-xs font-medium text-slate-500 sm:block">
              Tehnička trgovina
            </span>
          </span>
        </Link>

        <nav aria-label="Glavna navigacija" className="hidden items-center gap-1 md:flex">
          {site.navigation.map((item) => (
            <Link
              className="rounded-md px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button className="px-3" href="/proizvodi" variant="ghost">
            <Search aria-hidden="true" size={18} />
            Pretraži
          </Button>
          <Link
            aria-label={`Košarica, ${cartCount} artikala`}
            className="relative grid size-11 place-items-center rounded-md border border-slate-200 text-slate-800 transition hover:border-[#0055a8]/50 hover:text-[#0055a8]"
            href="/kosarica"
          >
            <ShoppingCart aria-hidden="true" size={20} />
            {cartCount > 0 ? (
              <span className="absolute -right-2 -top-2 grid min-w-6 place-items-center rounded-full bg-[#0055a8] px-1.5 text-xs font-bold text-white">
                {cartCount}
              </span>
            ) : null}
          </Link>
        </div>

        <button
          aria-expanded={open}
          aria-label={open ? "Zatvori navigaciju" : "Otvori navigaciju"}
          className="grid size-11 place-items-center rounded-md border border-slate-200 text-slate-900 md:hidden"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          {open ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
        </button>
      </div>

      <div
        aria-hidden={!open}
        className={cn(
          "grid border-t border-slate-200 bg-white transition-[grid-template-rows] duration-200 md:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          {open ? (
            <nav aria-label="Mobilna navigacija" className="space-y-1 px-4 py-4">
              {site.navigation.map((item) => (
                <Link
                  className="block rounded-md px-3 py-3 text-base font-semibold text-slate-800 hover:bg-slate-100"
                  href={item.href}
                  key={item.href}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                className="mt-3 flex items-center justify-between rounded-md bg-slate-950 px-3 py-3 font-semibold text-white"
                href="/kosarica"
                onClick={() => setOpen(false)}
              >
                <span>Košarica</span>
                <span>{cartCount}</span>
              </Link>
            </nav>
          ) : null}
        </div>
      </div>
    </header>
  );
}
