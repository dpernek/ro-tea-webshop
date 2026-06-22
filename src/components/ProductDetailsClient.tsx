"use client";

import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { ProductVisual } from "@/components/ProductVisual";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { formatStock } from "@/lib/format";
import { useCartStore } from "@/store/cart-store";
import type { Product } from "@/types/product";

export function ProductDetailsClient({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_0.86fr] lg:items-start">
      <div className="space-y-4">
        <ProductVisual
          category={product.category}
          className="aspect-[5/4] border border-slate-200"
          image={product.image}
          name={product.name}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {product.gallery.slice(0, 2).map((item, index) => (
            <ProductVisual
              category={product.category}
              className="aspect-[5/3] border border-slate-200"
              image={item}
              key={item}
              name={`${product.name} prikaz ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6 md:p-8">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          {product.badge ? <Badge>{product.badge}</Badge> : null}
          <Badge tone={product.stock > 0 ? "green" : "slate"}>
            {formatStock(product.stock)}
          </Badge>
        </div>
        <h1 className="text-4xl font-semibold tracking-normal text-slate-950 md:text-5xl">
          {product.name}
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">{product.shortDescription}</p>
        <div className="mt-7">
          <PriceDisplay oldPrice={product.oldPrice} price={product.price} size="lg" />
        </div>
        <p className="mt-7 leading-7 text-slate-700">{product.description}</p>

        <div className="mt-8 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center">
          <QuantitySelector
            max={Math.max(product.stock, 1)}
            onChange={setQuantity}
            value={quantity}
          />
          <Button
            className="w-full sm:flex-1"
            disabled={product.stock <= 0}
            onClick={() => addItem(product, quantity)}
            size="lg"
          >
            <ShoppingCart aria-hidden="true" size={20} />
            Dodaj u košaricu
          </Button>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-slate-950">Specifikacije</h2>
          <dl className="mt-4 divide-y divide-slate-200 rounded-lg border border-slate-200">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div className="grid grid-cols-2 gap-4 px-4 py-3 text-sm" key={key}>
                <dt className="font-semibold text-slate-700">{key}</dt>
                <dd className="text-slate-600">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
