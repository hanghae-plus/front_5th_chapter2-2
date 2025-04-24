import { useState } from "react";

export const useProductForm = () => {
  const [showNewProductForm, setShowNewProductForm] = useState(false);

  const handleProductFormToggle = () => {
    setShowNewProductForm(!showNewProductForm);
  };

  return { showNewProductForm, setShowNewProductForm, handleProductFormToggle };
};
