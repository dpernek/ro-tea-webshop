export type ProductSpecification = Record<string, string>;

export type Product = {
  id: string;
  slug: string;
  name: string;
  sku?: string | null;
  brand?: string | null;
  category: string;
  categories?: string[];
  price: number;
  regularPrice?: number | null;
  oldPrice: number | null;
  salePrice?: number | null;
  image: string;
  gallery: string[];
  shortDescription: string;
  description: string;
  specifications: ProductSpecification;
  stock: number | null;
  stockStatus?: "instock" | "outofstock" | "onbackorder" | "unknown";
  featured: boolean;
  badge: string | null;
  type?: "simple" | "variable" | "unknown";
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image?: string;
  featured?: boolean;
  count?: number;
};

export type Brand = {
  id: string;
  slug: string;
  name: string;
  count: number;
};

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  oldPrice: number | null;
  image: string;
  quantity: number;
};
