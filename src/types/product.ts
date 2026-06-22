export type ProductSpecification = Record<string, string>;

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  oldPrice: number | null;
  image: string;
  gallery: string[];
  shortDescription: string;
  description: string;
  specifications: ProductSpecification;
  stock: number;
  featured: boolean;
  badge: string | null;
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  featured: boolean;
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
