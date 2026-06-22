import { formatPrice } from "@/lib/format";

export function PriceDisplay({
  price,
  oldPrice,
  size = "md",
}: {
  price: number;
  oldPrice?: number | null;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl md:text-5xl",
  }[size];

  return (
    <div className="flex flex-wrap items-baseline gap-3">
      <span className={`${sizeClass} font-semibold tracking-normal text-slate-950`}>
        {formatPrice(price)}
      </span>
      {oldPrice ? (
        <span className="text-sm font-medium text-slate-400 line-through">
          {formatPrice(oldPrice)}
        </span>
      ) : null}
    </div>
  );
}
