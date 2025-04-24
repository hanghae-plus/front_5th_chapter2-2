import { useState } from 'react';

export const useNewProductFormToggle = () => {
  const [showNewProductForm, setShowNewProductForm] = useState(false);

  const openNewProductForm = () => setShowNewProductForm(true);
  const closeNewProductForm = () => setShowNewProductForm(false);
  const toggleNewProductForm = () => setShowNewProductForm((prev) => !prev);
  return { showNewProductForm, setShowNewProductForm, openNewProductForm, closeNewProductForm, toggleNewProductForm };
};
