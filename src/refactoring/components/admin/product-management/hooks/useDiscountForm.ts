import { Discount } from "../../../../../types.ts";
import { useState } from "react";

export const useDiscountForm = (initialDiscounts: Discount[]) => {
  const [discounts, setDiscounts] = useState<Discount[]>([...initialDiscounts]);
  const [newDiscount, setNewDiscount] = useState<Discount>({
    quantity: 0,
    rate: 0,
  });

  const handleAddDiscount = () => {
    if (newDiscount.quantity <= 0 || newDiscount.rate <= 0) return;

    const updatedDiscounts = [...discounts, { ...newDiscount }];
    setDiscounts(updatedDiscounts);
    setNewDiscount({ quantity: 0, rate: 0 });
    return updatedDiscounts;
  };

  const handleRemoveDiscount = (index: number) => {
    const updatedDiscounts = [...discounts];
    updatedDiscounts.splice(index, 1);
    setDiscounts(updatedDiscounts);
    return updatedDiscounts;
  };

  return {
    discounts,
    newDiscount,
    setNewDiscount,
    handleAddDiscount,
    handleRemoveDiscount,
  };
};
