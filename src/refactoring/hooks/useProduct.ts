import { useState } from "react";
import { Product } from "../../types.ts";

export const useProducts = (initialProducts: Product[]) => {
    // 초기 상품 목록으로 상태 초기화
    const [products, setProducts] = useState<Product[]>(initialProducts);

    // 상품 업데이트
    const updateProduct = (updatedProduct: Product) => {
      setProducts(prevProducts =>
        prevProducts.map(product =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
    };
  
    // 새 상품 추가
    const addProduct = (newProduct: Product) => {
      setProducts(prevProducts => [...prevProducts, newProduct]);
    };
  
    return {
      products,
      updateProduct,
      addProduct,
    };
};
