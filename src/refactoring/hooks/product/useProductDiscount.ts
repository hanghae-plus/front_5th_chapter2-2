import { useState } from "react";
import { Discount, Product } from "../../../types";

export const useProductDiscount = () => {
  const [newDiscount, setNewDiscount] = useState<Discount>({
    quantity: 0,
    rate: 0,
  });

  const handleAddDiscount = (product: Product) => {
    if (!product) return product;
    return {
      ...product,
      discounts: [...product.discounts, newDiscount],
    };
  };

  const handleRemoveDiscount = (product: Product, index: number) => {
    if (!product) return product;
    return {
      ...product,
      discounts: product.discounts.filter((_, i) => i !== index),
    };
  };

  return {
    newDiscount,
    setNewDiscount,
    handleAddDiscount,
    handleRemoveDiscount,
  };
};
