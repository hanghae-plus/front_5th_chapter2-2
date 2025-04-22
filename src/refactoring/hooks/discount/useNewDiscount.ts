import { Discount } from "@/refactoring/entities";
import { useState } from "react";

export const useNewDiscount = () => {
  const [newDiscount, setNewDiscount] = useState<Discount>({ quantity: 0, rate: 0 });

  const resetNewDiscount = () => {
    setNewDiscount({ quantity: 0, rate: 0 });
  };

  const updateNewDiscount = (discount: Discount) => {
    setNewDiscount(discount);
  };

  return {
    newDiscount,
    resetNewDiscount,
    updateNewDiscount,
  };
};
