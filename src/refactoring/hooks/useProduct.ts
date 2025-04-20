import { useState } from "react";
import type { IProduct } from "#src/types";

// 엔티티를 다루는 훅
export const useProducts = (initialProducts: IProduct[]) => {
  const [products, setProducts] = useState<IProduct[]>(initialProducts);

  /** 상품 추가 */
  const addProduct = (newProduct: IProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };
  /** 상품 수정 */
  const updateProduct = (updatedProduct: IProduct) => {
    setProducts((prevProducts) => prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
  };

  return {
    products,
    addProduct,
    updateProduct,
  };
};
