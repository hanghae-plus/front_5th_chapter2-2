import { useState } from "react";
import type { Product } from "#src/types";

// 엔티티를 다루는 훅
export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  /** 상품 추가 */
  const addProduct = (newProduct: Product) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };
  /** 상품 수정 */
  const updateProduct = (updatedProduct: Product) => {
    setProducts((prevProducts) => prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
  };

  return {
    products,
    addProduct,
    updateProduct,
  };
};
