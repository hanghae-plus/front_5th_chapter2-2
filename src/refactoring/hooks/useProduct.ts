import { Product } from "../../types";

export const useProducts = (initialProducts: Product[]) => {
  return {
    products: initialProducts,
    updateProduct: () => undefined,
    addProduct: () => undefined,
  };
};
