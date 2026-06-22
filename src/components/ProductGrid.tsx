"use client";

import { useEffect, useRef } from "react";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/types/product";

export function ProductGrid({ products }: { products: Product[] }) {
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!gridRef.current || products.length === 0) return;

    let context: { revert: () => void } | undefined;

    const setup = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);
      context = gsap.context(() => {
        gsap.fromTo(
          ".product-card",
          { y: 22, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.58,
            ease: "power3.out",
            immediateRender: false,
            stagger: 0.055,
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 86%",
              once: true,
            },
          },
        );
      }, gridRef);
    };

    setup();

    return () => context?.revert();
  }, [products]);

  if (products.length === 0) {
    return (
      <EmptyState
        description="Promijenite filtere ili upišite drugi pojam za pretraživanje."
        title="Nema proizvoda za odabrane kriterije"
      />
    );
  }

  return (
    <div ref={gridRef} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
