"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { ProductVisual } from "@/components/ProductVisual";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { formatStock } from "@/lib/format";
import { useCartStore } from "@/store/cart-store";
import type { Product } from "@/types/product";

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const addItem = useCartStore((state) => state.addItem);
  const inStock = product.stockStatus !== "outofstock" && product.stock !== 0;

  return (
    <article className="product-card flex h-full flex-col rounded-lg border border-slate-200 bg-white p-4 transition duration-200 hover:-translate-y-1 hover:border-[#0055a8]/40 hover:shadow-[0_18px_50px_rgba(15,23,42,0.10)]">
      <Link href={`/proizvodi/${product.slug}`} aria-label={`Otvori ${product.name}`}>
        <ProductVisual
          category={product.category}
          image={product.image}
          name={product.name}
          priority={priority}
        />
      </Link>

      <div className="flex flex-1 flex-col pt-5">
        <div className="mb-3 flex min-h-7 items-center justify-between gap-3">
          {product.badge ? <Badge>{product.badge}</Badge> : <span />}
          <span
            className={`text-xs font-semibold ${
              inStock ? "text-emerald-700" : "text-slate-500"
            }`}
          >
            {formatStock(product.stock, product.stockStatus)}
          </span>
        </div>
        <h3 className="text-lg font-semibold leading-6 text-slate-950">
          <Link
            className="transition hover:text-[#0055a8]"
            href={`/proizvodi/${product.slug}`}
          >
            {product.name}
          </Link>
        </h3>
        {product.brand ? (
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">
            {product.brand}
          </p>
        ) : null}
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
          {product.shortDescription}
        </p>
        <div className="mt-auto pt-5">
          <PriceDisplay oldPrice={product.oldPrice} price={product.price} size="sm" />
          <Button
            className="mt-4 w-full"
            disabled={!inStock}
            onClick={() => addItem(product, 1)}
            variant={inStock ? "primary" : "secondary"}
          >
            <ShoppingCart aria-hidden="true" size={18} />
            {inStock ? (product.price > 0 ? "Dodaj u košaricu" : "Dodaj upit") : "Nedostupno"}
          </Button>
        </div>
      </div>
    </article>
  );
}
