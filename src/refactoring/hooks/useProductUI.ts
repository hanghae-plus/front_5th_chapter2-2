import { useState } from "react";
import { Product, Discount } from "../../types.ts";

export const useProductUI = () => {
  const [openProductIds, setOpenProductIds] = useState<Set<string>>(new Set());
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newDiscount, setNewDiscount] = useState<Discount>({
    quantity: 0,
    rate: 0,
  });
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    price: 0,
    stock: 0,
    discounts: [],
  });

  const toggleProductAccordion = (productId: string) => {
    setOpenProductIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

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
    openProductIds,
    editingProduct,
    setEditingProduct,
    newDiscount,
    setNewDiscount,
    showNewProductForm,
    newProduct,

    toggleProductAccordion,
    handleEditProduct,
    handleCancelEdit,
    toggleNewProductForm,
    updateNewProduct,
    resetNewProduct,
    getNewProductWithId,
  };
};
