import { useState } from "react";

export const useProductAccordion = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => setIsOpen(!isOpen);

  return {
    isOpen,
    toggleAccordion,
  };
};
