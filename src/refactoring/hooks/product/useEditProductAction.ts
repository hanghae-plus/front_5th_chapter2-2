import { Product } from "../../entities";
import { useProductStore } from "../../store/product-store";

/**
 * 상품 편집 작업을 위한 액션 훅
 * - 편집 중인 상품 상태를 제어하고
 * - 이름/가격 수정 및 최종 저장을 수행함
 *
 */

export const useEditProductAction = () => {
  const { updateProduct, editingProduct, updateEditingProduct } = useProductStore();

  const handleEditProduct = (product: Product) => {
    updateEditingProduct({ ...product });
  };

  // 이름 수정
  const handleProductNameUpdate = (productId: string, newName: string) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, name: newName };
      updateEditingProduct(updatedProduct);
    }
  };

  // 가격 수정
  const handlePriceUpdate = (productId: string, newPrice: number) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, price: newPrice };
      updateEditingProduct(updatedProduct);
    }
  };

  // 수정 완료
  const handleEditComplete = () => {
    if (editingProduct) {
      updateProduct(editingProduct);
      updateEditingProduct(null);
    }
  };

  return {
    handleEditProduct,
    handleProductNameUpdate,
    handlePriceUpdate,
    handleEditComplete,
  };
};
