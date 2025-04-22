import { useState } from "react";
import { Product } from "../../types";

export const useNewProduct = () => {
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    price: 0,
    stock: 0,
    discounts: [],
  });

  const toggleNewProductForm = () => {
    setShowNewProductForm((prev) => !prev);
  };

  const updateNewProduct = (field: keyof Omit<Product, "id">, value: any) => {
    setNewProduct((prev) => ({ ...prev, [field]: value }));
  };

  const resetNewProduct = () => {
    setNewProduct({
      name: "",
      price: 0,
      stock: 0,
      discounts: [],
    });
    setShowNewProductForm(false);
  };

  const getNewProductWithId = (): Product => {
    return { ...newProduct, id: Date.now().toString() };
  };

  return {
    showNewProductForm,
    newProduct,
    toggleNewProductForm,
    updateNewProduct,
    resetNewProduct,
    getNewProductWithId,
  };
};
