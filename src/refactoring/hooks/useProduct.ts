import { useState } from "react";
import { Product } from "../../types.ts";

/**
 * 상품 관리 기능을 제공하는 커스텀 훅
 * 엔티티 상태: products
 * 액션 함수: updateProduct, addProduct, removeProduct
 * 순수 함수: findProduct, getProductsByCategory, getDiscountedPrice 등
 */
export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState<Product[]>(() => initialProducts);

  const updateProduct = (updatedProduct: Product) => {
    setProducts((products) =>
      products.map((product) =>
        product.id === updatedProduct.id
          ? { ...product, ...updatedProduct }
          : product
      )
    );
  };

  const addProduct = (product: Product) => {
    setProducts((products) => [...products, product]);
  };

  return {
    products,
    updateProduct,
    addProduct,
  };
};
