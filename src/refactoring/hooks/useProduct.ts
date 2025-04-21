import { useState } from "react";
import { Product } from "../../types.ts";

/**
 *액션: updateProduct, addProduct
 *계산:
 *데이터: initialProducts, products -> state와 props
 */
export const useProducts = (initialProducts: Product[]) => {
  //  TODO: 액션에서 계산 분리하기

  const [products, setProducts] = useState<Product[]>(initialProducts);

  /**상품을 업데이트합니다. */
  const updateProduct = (updatedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === updatedProduct.id ? updatedProduct : p,
      ),
    );
  };

  /**상품을 추가합니다. */
  const addProduct = (newProduct: Product) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  return {
    products,
    updateProduct,
    addProduct,
  };
};
