"use client";

import Image from "next/image";
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

        <div className="hero-visual relative overflow-hidden rounded-lg border border-slate-200 bg-slate-50 shadow-[0_28px_90px_rgba(15,23,42,0.12)]">
          <div className="relative aspect-[4/3] min-h-[360px] w-full md:min-h-[440px]">
            <Image
              alt="RO-TEA tehnička oprema: alat, rasvjeta, kabeli, sklopka i vodoinstalacijski elementi"
              className="object-cover"
              fill
              priority
              sizes="(min-width: 1024px) 560px, 100vw"
              src="/hero/ro-tea-hero-equipment.png"
            />
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/90 to-transparent" />
            <div className="absolute left-4 top-4 rounded-md border border-white/70 bg-white/88 px-4 py-3 shadow-[0_14px_40px_rgba(15,23,42,0.12)] backdrop-blur-md sm:left-6 sm:top-6">
              <div className="relative h-7 w-[154px]">
                <Image
                  alt="RO-TEA"
                  className="object-contain object-left"
                  fill
                  sizes="154px"
                  src="/brand/rotea-logo.webp"
                />
              </div>
              <p className="mt-2 text-xs font-semibold text-slate-600">
                Tehnička oprema za brzu kupnju
              </p>
            </div>
            <div className="absolute bottom-4 left-4 right-4 grid gap-3 sm:grid-cols-3">
              {["Alati", "Elektro materijal", "Rasvjeta"].map((item) => (
                <div
                  className="rounded-md border border-white/70 bg-white/88 p-3 text-sm font-semibold text-slate-800 shadow-[0_12px_34px_rgba(15,23,42,0.10)] backdrop-blur-md"
                  key={item}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
