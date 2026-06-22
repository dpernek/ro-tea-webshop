import brandsData from "@/data/brands.json";
import categoriesData from "@/data/categories.json";
import productsData from "@/data/products.json";
import type { Brand, Category, Product } from "@/types/product";

export const products = productsData as unknown as Product[];
export const categories = categoriesData as unknown as Category[];
export const brands = brandsData as unknown as Brand[];

export const getProductBySlug = (slug: string) =>
  products.find((product) => product.slug === slug);

export const getCategoryBySlug = (slug: string) =>
  categories.find((category) => category.slug === slug);

export const getProductsByCategory = (categorySlug: string) =>
  products.filter(
    (product) =>
      product.category === categorySlug || (product.categories ?? []).includes(categorySlug),
  );

export const getFeaturedProducts = () =>
  (products.some((product) => product.featured)
    ? products.filter((product) => product.featured)
    : products.filter((product) => product.price > 0 && product.image)
  ).slice(0, 8);

export const getFeaturedCategories = () =>
  (categories.some((category) => category.featured)
    ? categories.filter((category) => category.featured)
    : [...categories].sort((a, b) => (b.count ?? 0) - (a.count ?? 0))
  ).slice(0, 6);

export const getRelatedProducts = (product: Product, limit = 4) =>
  products
    .filter(
      (candidate) => candidate.category === product.category && candidate.id !== product.id,
    )
    .concat(products.filter((candidate) => candidate.id !== product.id))
    .filter(
      (candidate, index, all) => all.findIndex((item) => item.id === candidate.id) === index,
    )
    .slice(0, limit);
