import { useState } from "react";

export const useProductAccordion = () => {
  const [openProductIds, setOpenProductIds] = useState<Set<string>>(new Set());

  /** 각 상품의 정보와 수정을 위한 아코디언 토글 */
  const toggleProductAccordion = (productId: string) => {
    setOpenProductIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  return { openProductIds, toggleProductAccordion };
};
