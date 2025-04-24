import { useState } from "react";

export const useAccordion = <T extends string | number>() => {
  const [openIds, setOpenIds] = useState<Set<T>>(new Set());

  const toggle = (id: T) => {
    setOpenIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const isOpen = (id: T) => openIds.has(id);

  return {
    openIds,
    isOpen,
    toggle,
  };
};
