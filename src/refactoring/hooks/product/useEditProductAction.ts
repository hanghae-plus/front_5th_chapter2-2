import { Product } from "../../entities";
import { useProductStore } from "../../store/product-store";

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
