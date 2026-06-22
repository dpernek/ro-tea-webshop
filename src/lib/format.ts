export const formatPrice = (value: number) =>
  new Intl.NumberFormat("hr-HR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  }).format(value);

export const formatStock = (stock: number) => {
  if (stock <= 0) return "Nema na zalihi";
  if (stock <= 5) return `Još ${stock} kom.`;
  return "Dostupno odmah";
};
