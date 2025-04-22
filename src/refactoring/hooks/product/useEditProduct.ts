import { useProducts } from "@/refactoring/hooks/product/useProduct";
import { useState } from "react";
import { Product } from "../../entities";

export const useEditProduct = () => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { updateProduct } = useProducts();

  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };

  // 업데이트
  const updateEditingProduct = (product: Product) => {
    setEditingProduct(product);
  };

  // 이름 수정
  const handleProductNameUpdate = (productId: string, newName: string) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, name: newName };
      setEditingProduct(updatedProduct);
    }
  };

  // 가격 수정
  const handlePriceUpdate = (productId: string, newPrice: number) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, price: newPrice };
      setEditingProduct(updatedProduct);
    }
  };

  // 수정 완료
  const handleEditComplete = () => {
    if (editingProduct) {
      updateProduct(editingProduct);
      setEditingProduct(null);
    }
  };

  return {
    editingProduct,
    updateEditingProduct,
    handleEditProduct,
    handleProductNameUpdate,
    handlePriceUpdate,
    handleEditComplete,
  };
};
