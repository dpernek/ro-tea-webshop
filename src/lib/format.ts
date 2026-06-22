export const formatPrice = (value: number) =>
  new Intl.NumberFormat("hr-HR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  }).format(value);

export const formatStock = (
  stock: number | null | undefined,
  stockStatus: "instock" | "outofstock" | "onbackorder" | "unknown" = "unknown",
) => {
  if (stockStatus === "outofstock") return "Nije dostupno";
  if (stockStatus === "onbackorder") return "Dostupno uz narudžbu";
  if (stock == null) {
    if (stockStatus === "instock") return "Dostupno";
    return "Provjeriti dostupnost";
  }
  if (stock <= 0) return "Nema na zalihi";
  if (stock <= 5) return `Još ${stock} kom.`;
  return "Dostupno odmah";
};
