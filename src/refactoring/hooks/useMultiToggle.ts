import { useState } from 'react';

export default function useMultiToggle() {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggleAccordion = (id: string) => {
    setOpenIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const isOpen = (id: string) => openIds.has(id);

  return {
    openIds,
    setOpenIds,
    toggleAccordion,
    isOpen
  };
}
