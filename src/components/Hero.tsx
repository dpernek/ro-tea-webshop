"use client";

import { ArrowRight, ShieldCheck, Truck } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    let context: { revert: () => void } | undefined;

    const setup = async () => {
      const { gsap } = await import("gsap");

      context = gsap.context(() => {
        gsap.fromTo(
          ".hero-copy > *",
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, ease: "power3.out", stagger: 0.09 },
        );
        gsap.fromTo(
          ".hero-visual",
          { y: 34, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: "power3.out", delay: 0.15 },
        );
      }, rootRef);
    };

    setup();

    return () => context?.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden border-b border-slate-200 bg-white"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1fr_0.92fr] md:items-center md:py-18 lg:px-8">
        <div className="hero-copy max-w-3xl">
          <h1 className="max-w-3xl text-5xl font-semibold tracking-normal text-slate-950 md:text-6xl lg:text-7xl">
            RO-TEA oprema za ozbiljan rad
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
            Moderna tehnička trgovina za alate, elektro materijal, rasvjetu, vodoinstalacije i
            pametnu kuću. Jasna ponuda, brza kupnja i oprema spremna za stvarne projekte.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/proizvodi" size="lg">
              Kupi proizvode
              <ArrowRight aria-hidden="true" size={19} />
            </Button>
            <Button href="/kontakt" size="lg" variant="secondary">
              Zatraži ponudu
            </Button>
          </div>
          <div className="mt-9 grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4">
              <Truck aria-hidden="true" className="text-[#0055a8]" size={22} />
              <span className="text-sm font-semibold text-slate-800">
                Brza priprema narudžbe
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4">
              <ShieldCheck aria-hidden="true" className="text-emerald-600" size={22} />
              <span className="text-sm font-semibold text-slate-800">
                Provjerena tehnička oprema
              </span>
            </div>
          </div>
        </div>

        <div className="hero-visual relative min-h-[420px] rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-[0_28px_90px_rgba(15,23,42,0.12)]">
          <div className="absolute inset-0 rounded-lg bg-[radial-gradient(circle_at_70%_20%,rgba(0,85,168,0.18),transparent_34%),linear-gradient(145deg,#ffffff,#f8fafc)]" />
          <div className="relative grid h-full min-h-[380px] grid-rows-[1fr_auto] overflow-hidden rounded-md border border-white bg-white/70 p-5">
            <div className="grid place-items-center">
              <div className="relative size-56 rounded-lg bg-[#0055a8] shadow-[0_28px_70px_rgba(0,85,168,0.25)]">
                <div className="absolute left-8 top-8 h-16 w-28 rounded-md bg-white/95" />
                <div className="absolute bottom-9 left-8 h-8 w-36 rounded-md bg-slate-950/90" />
                <div className="absolute right-8 top-20 grid size-20 place-items-center rounded-full bg-white text-lg font-black text-[#0055a8]">
                  RT
                </div>
                <div className="absolute -right-9 bottom-10 h-24 w-12 rounded-md bg-amber-400 shadow-lg" />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {["Alati", "Rasvjeta", "Pametna kuća"].map((item) => (
                <div
                  className="rounded-md border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-800"
                  key={item}
                >
                  {item}
                  <span className="mt-2 block h-1.5 w-full rounded-full bg-slate-100">
                    <span className="block h-1.5 w-2/3 rounded-full bg-[#0055a8]" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
