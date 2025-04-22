import { Product } from "@/refactoring/entities";
import { useState } from "react";

/**
 * 상품 목록을 관리하는 커스텀 훅
 *
 * @param initialProducts - 초기 상품 배열
 * @returns 상품 배열과 조작 함수 (addProduct, updateProduct)
 *
 */

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const addProduct = (newProduct: Product) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
    );
  };

  return {
    products,
    updateProduct,
    addProduct,
  };
};
