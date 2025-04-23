import { useState } from 'react';

const useProductAccordion = () => {
  const [openProductIds, setOpenProductIds] = useState<Set<string>>(new Set()); // 상품 오픈 상태

  // 아코디언 (액션 함수)
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

export default useProductAccordion;
