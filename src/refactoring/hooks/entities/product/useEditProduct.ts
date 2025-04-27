import { useState } from "react";
import { Product } from "@/types";
import { useProductContext } from "@r/provider/ProductProvider";

export const useEditProduct = () => {
  const { products, updateProduct } = useProductContext();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  /** 상품의 이름을 업데이트합니다.*/
  const handleProductNameUpdate = (productId: string, newName: string) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, name: newName };
      setEditingProduct(updatedProduct);
    }
  };

  /** 상품의 가격을 업데이트합니다. */
  const handlePriceUpdate = (productId: string, newPrice: number) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, price: newPrice };
      setEditingProduct(updatedProduct);
    }
  };

  /**상품의 재고를 업데이트합니다. */
  const handleStockUpdate = (productId: string, newStock: number) => {
    const updatedProduct = products.find((p) => p.id === productId);

    if (!updatedProduct) return;

    const newProduct = { ...updatedProduct, stock: newStock };

    updateProduct(newProduct);
    setEditingProduct(newProduct);
  };

  /** productId의 index에 해당하는 할인을 삭제합니다. */
  const handleRemoveDiscount = (productId: string, index: number) => {
    const updatedProduct = products.find((p) => p.id === productId);

    if (!updatedProduct) return;

    const newProduct = {
      ...updatedProduct,
      discounts: updatedProduct.discounts.filter((_, i) => i !== index),
    };

    updateProduct(newProduct);
    setEditingProduct(newProduct);
  };

  /** 편집하는 상품을 수정합니다.*/
  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };

  /** 상품의 수정을 완료합니다. */
  const handleEditComplete = () => {
    if (!editingProduct) return;

    updateProduct(editingProduct);
    setEditingProduct(null);
  };

  return {
    editingProduct,
    setEditingProduct,
    handleProductNameUpdate,
    handlePriceUpdate,
    handleStockUpdate,
    handleRemoveDiscount,
    handleEditProduct,
    handleEditComplete,
  };
};
