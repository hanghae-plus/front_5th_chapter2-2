import { updateProductInList } from "@/refactoring/models";
import { Product } from "@/types";
import { useCallback, useState } from "react";

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const updateProduct = useCallback((product: Product) => {
    setProducts((prev) => updateProductInList(prev, product));
  }, []);

  const addProduct = useCallback((product: Product) => {
    setProducts((prev) => [...prev, product]);
  }, []);

  return { products, updateProduct, addProduct };
};
