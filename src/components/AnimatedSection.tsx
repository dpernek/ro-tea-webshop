"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

export function AnimatedSection({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    let context: { revert: () => void } | undefined;

    const setup = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);
      context = gsap.context(() => {
        gsap.fromTo(
          sectionRef.current,
          { y: 34, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 82%",
              once: true,
            },
          },
        );
      }, sectionRef);
    };

    setup();

    return () => context?.revert();
  }, []);

  return (
    <section ref={sectionRef} className={className}>
      {children}
    </section>
  );
}
