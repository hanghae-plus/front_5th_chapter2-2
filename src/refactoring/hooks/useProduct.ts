import { useCallback, useState } from "react";
import { Product } from "../../types.ts";

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const updateProduct = useCallback((product: Product) => {
    setProducts((prev) => {
      const next = [...prev];
      const idx = next.findIndex(({ id }) => id === product.id);
      if (idx === -1) return next;

      next[idx] = product;
      return next;
    });
  }, []);

  const addProduct = useCallback((product: Product) => {
    setProducts((prev) => [...prev, product]);
  }, []);

  return { products, updateProduct, addProduct };
};
