import { useEffect, useState } from "react";
import { Product } from "../../types.ts";


/**
 * 제품 훅
 * @param initialProducts 초기 제품 목록
 * @returns 제품 상태와 작업 함수
 */
export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  /**
   * 제품을 업데이트
   * @param updatedProduct 업데이트할 제품
   * @returns 업데이트된 제품
   */
  const updateProduct = (updatedProduct: Product) => {
    setProducts(prevProducts => prevProducts.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  /**
   * 제품을 추가
   * @param newProduct 추가할 제품
   * @returns 추가된 제품
   */
  const addProduct = (newProduct: Product) => {
    setProducts(prevProducts => [...prevProducts, newProduct]);
  };

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);


  return {
    products,
    updateProduct,
    addProduct,
  };
};
