import { Discount } from "@/refactoring/entities";
import { useState } from "react";

/**
 * 새로운 할인 항목을 입력하기 위한 상태를 관리하는 커스텀 훅
 *
 */

export const useDiscount = () => {
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
