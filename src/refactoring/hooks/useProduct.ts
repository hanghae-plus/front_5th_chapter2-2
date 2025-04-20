import { useCallback, useState } from "react";
import { Product } from "../../types.ts";

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState(initialProducts);

  const addProduct = useCallback(
    (product: Product) => {
      setProducts((prev) => [...prev, product]);
    },
    [setProducts]
  );

  return {
    products,
    updateProduct: () => undefined,
    addProduct,
  };
};
