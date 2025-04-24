import { Discount } from "@refactoring/entities";
import { useProductStore } from "@refactoring/store/product-store";
import { useState } from "react";

/**
 * 할인 조건 입력 및 제품에 대한 할인 추가/삭제를 관리하는 커스텀 훅
 *
 * @returns 할인 입력 상태 및 관련 조작 함수들
 */
export const useDiscount = () => {
  const [newDiscount, setNewDiscount] = useState<Discount>({ quantity: 0, rate: 0 });
  const { products, updateProduct, editingProduct, updateEditingProduct } = useProductStore();

  /**
   * 할인 입력 상태를 초기 상태로 리셋
   */
  const resetNewDiscount = () => {
    setNewDiscount({ quantity: 0, rate: 0 });
  };

  const updateNewDiscount = (discount: Discount) => {
    setNewDiscount(discount);
  };

  /**
   * 현재입력된 할인 정보를 특정 상품에 추가
   * 편집 중인 상품(editingProduct)에도 동일하게 반영
   *
   */

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

  /**
   * 특정 상품의 할인 목록에서 해당 인덱스의 할인을 삭제한다
   * 편집 중인 상품(editingProduct)에도 동일하게 반영한다
   */

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
