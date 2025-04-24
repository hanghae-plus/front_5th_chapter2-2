import { useState } from "react";
import { Product } from "../../../types";

export const useProductEdit = ({
  onProductUpdate,
}: {
  onProductUpdate: (product: Product) => void;
}) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };

  const handleEditComplete = () => {
    if (editingProduct) {
      onProductUpdate(editingProduct);
      setEditingProduct(null);
    }
  };

  const handleFieldUpdate = <K extends keyof Product>(
    productId: string,
    field: K,
    value: Product[K]
  ) => {
    if (editingProduct && editingProduct.id === productId) {
      setEditingProduct({ ...editingProduct, [field]: value });
    }
  };

  return {
    editingProduct,
    handleEditProduct,
    handleEditComplete,
    handleFieldUpdate,
  };
};
