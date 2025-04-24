import { useState } from "react";
import { Product } from "../types";

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  // 상품 추가
  const addProduct = (newProduct: Product) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  // 상품 수정
  const updateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  return {
    products,
    addProduct,
    updateProduct,
  };
};