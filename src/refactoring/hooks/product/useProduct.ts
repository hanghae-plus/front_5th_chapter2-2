import { useProductStore } from "../../store/product-store";

/**
 * 테스트로 남겨둔 커스텀 훅
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
