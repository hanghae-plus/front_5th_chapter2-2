import { Product } from "@/types";

export const updateProductInList = (products: Product[], updated: Product) => {
  const newProducts = [...products];
  const idx = newProducts.findIndex((p) => p.id === updated.id);
  if (idx === -1) return newProducts;

  newProducts[idx] = updated;
  return newProducts;
};
