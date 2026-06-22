import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/format";
import { getCartSubtotal } from "@/store/cart-store";
import type { CartItem } from "@/types/product";

export function CartSummary({
  items,
  checkout = true,
}: {
  items: CartItem[];
  checkout?: boolean;
}) {
  const subtotal = getCartSubtotal(items);

  return (
    <aside className="rounded-lg border border-slate-200 bg-white p-5 md:p-6">
      <h2 className="text-xl font-semibold text-slate-950">Sažetak narudžbe</h2>
      <div className="mt-5 space-y-4 text-sm">
        <div className="flex justify-between gap-4 text-slate-600">
          <span>Međuzbroj</span>
          <span className="font-semibold text-slate-950">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between gap-4 text-slate-600">
          <span>Dostava</span>
          <span className="font-semibold text-slate-950">Prema dogovoru</span>
        </div>
        <div className="border-t border-slate-200 pt-4">
          <div className="flex justify-between gap-4 text-base font-semibold text-slate-950">
            <span>Ukupan iznos</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <p className="mt-2 text-xs leading-5 text-slate-500">
            Plaćanje nije aktivirano u ovoj početnoj verziji. Narudžba se šalje kao upit.
          </p>
        </div>
      </div>
      {checkout ? (
        <Button className="mt-6 w-full" href="/checkout" size="lg">
          Nastavi na checkout
        </Button>
      ) : null}
    </aside>
  );
}
