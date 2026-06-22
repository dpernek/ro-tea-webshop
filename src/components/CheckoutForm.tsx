"use client";

import { CheckCircle2, Send } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { CartSummary } from "@/components/CartSummary";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useHasMounted } from "@/hooks/useHasMounted";
import { formatPrice } from "@/lib/format";
import { getCartCount, getCartSubtotal, useCartStore } from "@/store/cart-store";
import type { CartItem } from "@/types/product";

type CheckoutValues = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  note: string;
};

type CheckoutErrors = Partial<Record<keyof CheckoutValues, string>>;

type ConfirmedOrder = {
  orderNumber: string;
  items: CartItem[];
  itemCount: number;
  total: number;
  customerName: string;
};

const initialValues: CheckoutValues = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  note: "",
};

const validate = (values: CheckoutValues) => {
  const errors: CheckoutErrors = {};

  if (values.name.trim().length < 3) errors.name = "Unesite ime i prezime.";
  if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = "Unesite ispravan email.";
  if (values.phone.trim().length < 6) errors.phone = "Unesite telefon za kontakt.";
  if (values.address.trim().length < 4) errors.address = "Unesite adresu dostave.";
  if (values.city.trim().length < 2) errors.city = "Unesite grad.";
  if (values.postalCode.trim().length < 4) {
    errors.postalCode = "Unesite poštanski broj.";
  }

  return errors;
};

export function CheckoutForm() {
  const mounted = useHasMounted();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(null);

  const subtotal = useMemo(() => getCartSubtotal(items), [items]);

  const updateValue = (key: keyof CheckoutValues, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0 || items.length === 0) return;

    const confirmation: ConfirmedOrder = {
      orderNumber: `RT-${Date.now().toString().slice(-6)}`,
      items,
      itemCount: getCartCount(items),
      total: subtotal,
      customerName: values.name,
    };

    setConfirmedOrder(confirmation);
    clearCart();
  };

  if (!mounted) {
    return <div className="min-h-[460px] rounded-lg bg-slate-100" />;
  }

  if (confirmedOrder) {
    return (
      <div className="rounded-lg border border-emerald-200 bg-white p-8 text-center shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
        <div className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-100 text-emerald-700">
          <CheckCircle2 aria-hidden="true" size={34} />
        </div>
        <h1 className="mt-6 text-3xl font-semibold text-slate-950">Narudžba je zaprimljena</h1>
        <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-600">
          Hvala, {confirmedOrder.customerName}. Poslali ste upit broj{" "}
          <strong>{confirmedOrder.orderNumber}</strong>. U stvarnoj produkcijskoj verziji ovdje
          bi se poslala email potvrda i narudžba u backend sustav.
        </p>
        <div className="mx-auto mt-7 max-w-md rounded-lg border border-slate-200 bg-slate-50 p-5 text-left">
          <div className="flex justify-between text-sm font-semibold text-slate-700">
            <span>Artikala</span>
            <span>{confirmedOrder.itemCount}</span>
          </div>
          <div className="mt-3 flex justify-between text-base font-semibold text-slate-950">
            <span>Ukupno</span>
            <span>{formatPrice(confirmedOrder.total)}</span>
          </div>
        </div>
        <Button className="mt-7" href="/proizvodi">
          Nastavi kupnju
        </Button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState
        description="Checkout je dostupan nakon što dodate barem jedan proizvod u košaricu."
        title="Nema proizvoda za checkout"
      />
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
      <form
        className="rounded-lg border border-slate-200 bg-white p-5 md:p-7"
        noValidate
        onSubmit={handleSubmit}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Input
              error={errors.name}
              label="Ime i prezime"
              name="name"
              onChange={(event) => updateValue("name", event.target.value)}
              value={values.name}
            />
          </div>
          <Input
            error={errors.email}
            label="Email"
            name="email"
            onChange={(event) => updateValue("email", event.target.value)}
            type="email"
            value={values.email}
          />
          <Input
            error={errors.phone}
            label="Telefon"
            name="phone"
            onChange={(event) => updateValue("phone", event.target.value)}
            type="tel"
            value={values.phone}
          />
          <div className="sm:col-span-2">
            <Input
              error={errors.address}
              label="Adresa"
              name="address"
              onChange={(event) => updateValue("address", event.target.value)}
              value={values.address}
            />
          </div>
          <Input
            error={errors.city}
            label="Grad"
            name="city"
            onChange={(event) => updateValue("city", event.target.value)}
            value={values.city}
          />
          <Input
            error={errors.postalCode}
            label="Poštanski broj"
            name="postalCode"
            onChange={(event) => updateValue("postalCode", event.target.value)}
            value={values.postalCode}
          />
          <label className="block sm:col-span-2" htmlFor="note">
            <span className="mb-2 block text-sm font-semibold text-slate-800">Napomena</span>
            <textarea
              className="min-h-32 w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#0055a8] focus:ring-4 focus:ring-[#0055a8]/10"
              id="note"
              name="note"
              onChange={(event) => updateValue("note", event.target.value)}
              placeholder="Npr. dostava na poslovnu adresu, R1 podaci ili dodatna pitanja."
              value={values.note}
            />
          </label>
        </div>
        <Button className="mt-6 w-full sm:w-auto" size="lg" type="submit">
          <Send aria-hidden="true" size={19} />
          Pošalji narudžbu
        </Button>
      </form>
      <CartSummary checkout={false} items={items} />
    </div>
  );
}
