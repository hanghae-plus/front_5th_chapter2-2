// src/components/Admin/hooks/useNewProductManager.ts

import { useState } from "react";
import { Product } from "../../../../types";
import { INITIAL_PRODUCT } from "../../../constants/initialData";

const initialNewProductState: Product = {
  ...INITIAL_PRODUCT,
  id: "",
  discounts: [],
};

export const useNewProductManager = (
  onProductAdd: (newProduct: Product) => void
) => {
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState<Product>(initialNewProductState);

  const handleProductFieldChange = (
    field: keyof Product,
    value: string | number
  ) => {
    setNewProduct((prev) => ({
      ...prev,
      [field]:
        typeof value === "string" && field !== "name"
          ? parseInt(value) || 0
          : value,
    }));
  };

  const handleAddNewProduct = () => {
    const productToAdd: Product = {
      ...newProduct,
      id: Date.now().toString(),
    };
    onProductAdd(productToAdd);
    setNewProduct(initialNewProductState);
    setShowNewProductForm(false);
  };

  const toggleNewProductForm = () => {
    setShowNewProductForm((prev) => !prev);
    if (!showNewProductForm) {
      setNewProduct(initialNewProductState);
    }
  };

  return {
    showNewProductForm,
    newProduct,
    handleProductFieldChange,
    handleAddNewProduct,
    toggleNewProductForm,
  };
};
