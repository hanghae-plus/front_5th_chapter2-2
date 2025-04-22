import { useContext } from "react";
import { ProductStoreContext } from "../../../entities/product/stores/product.stores";
import { Product } from "../../../entities/product/types";

export const useProducts = () => {
  const store = useContext(ProductStoreContext);

  if (!store) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }

  const { products, selectedProductId } = store;

  // 제품 추가 함수
  const addProduct = (newProduct: Product): void => {
    store.addProduct(newProduct);
  };

  // 제품 업데이트 함수
  const updateProduct = (updatedProduct: Product): void => {
    store.updateProduct(updatedProduct);
  };

  // 제품 삭제 함수
  const removeProduct = (productId: string): void => {
    store.removeProduct(productId);
  };

  // 제품 ID로 찾기
  const findProductById = (id: string): Product | undefined => {
    return store.findProductById(id);
  };

  // 선택된 제품 ID 설정
  const setSelectedProductId = (id: string): void => {
    store.setSelectedProductId(id);
  };

  return {
    products,
    selectedProductId,
    setSelectedProductId,
    addProduct,
    updateProduct,
    removeProduct,
    findProductById,
  };
};
