"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { ProductVisual } from "@/components/ProductVisual";
import { CartSummary } from "@/components/CartSummary";
import { EmptyState } from "@/components/ui/EmptyState";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { Button } from "@/components/ui/Button";
import { useHasMounted } from "@/hooks/useHasMounted";
import { formatPrice } from "@/lib/format";
import { useCartStore } from "@/store/cart-store";

export function CartPageClient() {
  const mounted = useHasMounted();
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  if (!mounted) {
    return <div className="min-h-[360px] rounded-lg bg-slate-100" />;
  }

  if (items.length === 0) {
    return (
      <EmptyState
        description="Dodajte proizvode u košaricu i vratite se ovdje za pregled narudžbe."
        title="Košarica je prazna"
      />
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
      <div className="space-y-4">
        {items.map((item) => (
          <article
            className="grid gap-4 rounded-lg border border-slate-200 bg-white p-4 sm:grid-cols-[150px_1fr] md:p-5"
            key={item.productId}
          >
            <ProductVisual
              category={item.category}
              className="aspect-[4/3]"
              image={item.image}
              name={item.name}
            />
            <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <h2 className="text-xl font-semibold text-slate-950">
                  <Link className="hover:text-[#0055a8]" href={`/proizvodi/${item.slug}`}>
                    {item.name}
                  </Link>
                </h2>
                <div className="mt-3">
                  <PriceDisplay oldPrice={item.oldPrice} price={item.price} size="sm" />
                </div>
                <p className="mt-3 text-sm font-semibold text-slate-600">
                  Stavka: {formatPrice(item.price * item.quantity)}
                </p>
              </div>
              <div className="flex items-center gap-3 md:justify-end">
                <QuantitySelector
                  onChange={(value) => updateQuantity(item.productId, value)}
                  value={item.quantity}
                />
                <button
                  aria-label={`Ukloni ${item.name}`}
                  className="grid size-11 place-items-center rounded-md border border-slate-200 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                  onClick={() => removeItem(item.productId)}
                  type="button"
                >
                  <Trash2 aria-hidden="true" size={18} />
                </button>
              </div>
            </div>
          </article>
        ))}
        <Button href="/proizvodi" variant="secondary">
          Nastavi kupnju
        </Button>
      </div>
      <CartSummary items={items} />
    </div>
  );
}
