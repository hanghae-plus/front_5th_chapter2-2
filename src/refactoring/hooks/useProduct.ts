import { useCallback, useContext } from "react";
import type { IProduct } from "#src/types";
import { ProductsContext } from "#src/refactoring/providers/ProductsProvider";

// 엔티티를 다루는 훅
export const useProducts = () => {
  const { products, setProducts } = useContext(ProductsContext);

  /** 상품 추가 */
  const addProduct = useCallback((newProduct: IProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  }, []);
  /** 상품 수정 */
  const updateProduct = useCallback((updatedProduct: IProduct) => {
    setProducts((prevProducts) => prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
  }, []);

  return {
    products,
    addProduct,
    updateProduct,
  };
};
