import { useState } from "react";
import { Discount, Product } from "../../types";

export const useDiscountManagement = (
  editingProduct: Product | null,
  setEditingProduct: React.Dispatch<React.SetStateAction<Product | null>>
) => {
  const [newDiscount, setNewDiscount] = useState<Discount>({
    quantity: 0,
    rate: 0,
  });

  const handleAddDiscount = () => {
    if (editingProduct) {
      setEditingProduct({
        ...editingProduct,
        discounts: [...editingProduct.discounts, newDiscount],
      });
      setNewDiscount({ quantity: 0, rate: 0 });
    }
  };

  const handleRemoveDiscount = (index: number) => {
    if (editingProduct) {
      setEditingProduct({
        ...editingProduct,
        discounts: editingProduct.discounts.filter((_, i) => i !== index),
      });
    }
  };

  return {
    newDiscount,
    setNewDiscount,
    handleAddDiscount,
    handleRemoveDiscount,
  };
};
