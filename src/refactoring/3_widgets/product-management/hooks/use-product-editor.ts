import { useState } from "react";
import { Product, Discount } from "../../../6_shared/types";
import * as ProductModel from "../../../5_entities/product/lib";

export const useProductEditor = (
  initialProduct: Product,
  updateProduct: (product: Product) => void
) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product>(initialProduct);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleProductChange = <K extends keyof Product>(
    field: K,
    value: Product[K]
  ) => {
    setEditingProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddDiscountClick = (discount: Discount) => {
    setEditingProduct((prev) => ProductModel.addDiscount(prev, discount));
  };

  const handleRemoveDiscountClick = (index: number) => {
    setEditingProduct((prev) => ProductModel.removeDiscount(prev, index));
  };

  const handleSaveClick = () => {
    updateProduct(editingProduct);
    setIsEditing(false);
  };

  return {
    isEditing,
    editingProduct,
    handleEditClick,
    handleProductChange,
    handleAddDiscountClick,
    handleRemoveDiscountClick,
    handleSaveClick,
  };
};
