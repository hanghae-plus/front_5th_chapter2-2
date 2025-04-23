import { useProductStore } from "../../store/product-store";

/**
 * 상품 목록을 관리하는 커스텀 훅
 *
 * @param initialProducts - 초기 상품 배열
 * @returns 상품 배열과 조작 함수 (addProduct, updateProduct)
 *
 */

export const useProducts = () => {
  const { products, initializeProducts, updateProduct, addProduct } = useProductStore();

  return {
    products,
    updateProduct,
    initializeProducts,
    addProduct,
  };
};
