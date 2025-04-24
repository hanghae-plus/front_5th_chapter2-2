import { useState } from "react";
import { Discount } from "./types";

export const useDiscounts = (initialDiscounts: Discount[]) => {
  const [discounts, setDiscounts] = useState<Discount[]>(initialDiscounts);

  const addDiscount = (newDiscount: Discount) => {
    setDiscounts((prevDiscounts) => [...prevDiscounts, newDiscount]);
  };

  const removeDiscount = (index: number) => {
    setDiscounts((prevDiscounts) =>
      prevDiscounts.filter((_, i) => i !== index)
    );
  };

  return {
    discounts,
    addDiscount,
    removeDiscount,
  };
};
