import React, { useState } from 'react';
import { Discount, Product } from '../../../types';

interface UseDiscountManagementProps {
  editingProduct: Product | null;
  setEditingProduct: React.Dispatch<React.SetStateAction<Product | null>>;
}
const useDiscountManagement = (props: UseDiscountManagementProps) => {
  const { editingProduct, setEditingProduct } = props;

  const [newDiscount, setNewDiscount] = useState<Discount>({ quantity: 0, rate: 0 }); // 새 할인 상태

  // 할인 추가 (액션 함수)
  const handleAddDiscount = (productId: string) => {
    if (editingProduct && editingProduct.id === productId) {
      setEditingProduct({
        ...editingProduct,
        discounts: [...editingProduct.discounts, newDiscount],
      });
      setNewDiscount({ quantity: 0, rate: 0 });
    }
  };

  // 할인 제거 (액션 함수)
  const handleRemoveDiscount = (productId: string, index: number) => {
    if (editingProduct && editingProduct.id === productId) {
      setEditingProduct({
        ...editingProduct,
        discounts: editingProduct.discounts.filter((_, i) => i !== index),
      });
    }
  };

  return { newDiscount, setNewDiscount, handleAddDiscount, handleRemoveDiscount };
};

export default useDiscountManagement;
