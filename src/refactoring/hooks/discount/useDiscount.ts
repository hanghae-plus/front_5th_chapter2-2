import { useState } from "react";
import { Discount } from "../../entities";
import { useProductStore } from "../../store/product-store";

/**
 * 새로운 할인 항목을 입력하기 위한 상태를 관리하는 커스텀 훅
 *
 */

export const useDiscount = () => {
  const [newDiscount, setNewDiscount] = useState<Discount>({ quantity: 0, rate: 0 });
  const { products, updateProduct, editingProduct, updateEditingProduct } = useProductStore();

  const resetNewDiscount = () => {
    setNewDiscount({ quantity: 0, rate: 0 });
  };

  const updateNewDiscount = (discount: Discount) => {
    setNewDiscount(discount);
  };

  const handleAddDiscount = (productId: string) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct && editingProduct) {
      const newProduct = {
        ...updatedProduct,
        discounts: [...updatedProduct.discounts, newDiscount],
      };
      updateProduct(newProduct);
      updateEditingProduct(newProduct);
      resetNewDiscount();
    }
  };

  const handleRemoveDiscount = (productId: string, index: number) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct) {
      const newProduct = {
        ...updatedProduct,
        discounts: updatedProduct.discounts.filter((_: any, i: number) => i !== index),
      };
      updateProduct(newProduct);
      updateEditingProduct(newProduct);
    }
  };

  return {
    newDiscount,
    resetNewDiscount,
    updateNewDiscount,
    handleAddDiscount,
    handleRemoveDiscount,
  };
};
