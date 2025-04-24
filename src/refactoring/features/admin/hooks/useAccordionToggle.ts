import { useState } from 'react';

export const useAccordionToggle = () => {
  const [openProductIds, setOpenProductIds] = useState<Set<string>>(new Set());

  // 상품 목록 열기/닫기 토글
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
