import { useState } from "react";
import { Discount } from "../../../../types";

export const useDiscountEditor = () => {
  const [newDiscount, setNewDiscount] = useState<Discount>({
    quantity: 0,
    rate: 0,
  });

  const handleDiscountQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewDiscount((prev) => ({
      ...prev,
      quantity: parseInt(e.target.value),
    }));
  };

  const handleDiscountRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDiscount((prev) => ({
      ...prev,
      rate: parseInt(e.target.value) / 100,
    }));
  };

  const resetDiscount = () => {
    setNewDiscount({ quantity: 0, rate: 0 });
  };

  return {
    newDiscount,
    handleDiscountQuantityChange,
    handleDiscountRateChange,
    resetDiscount,
  };
};
