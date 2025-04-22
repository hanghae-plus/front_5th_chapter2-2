import { useState } from "react";
import { Product } from "../../types";

export const useProductEdit = () => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  const handleUpdateEditingField = (field: keyof Product, value: any) => {
    if (editingProduct) {
      setEditingProduct({ ...editingProduct, [field]: value });
    }
  };

  return {
    editingProduct,
    setEditingProduct,
    handleEditProduct,
    handleCancelEdit,
    handleUpdateEditingField,
  };
};
