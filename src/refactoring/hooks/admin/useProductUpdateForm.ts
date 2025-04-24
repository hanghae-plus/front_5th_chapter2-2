import { useSetAtom } from "jotai";
import { updateProductAtom } from "../../state";
import { useState } from "react";
import type { Discount, Product } from "../../types";

interface UseProductUpdateFormProps {
  products: Product[];
  editingProduct: Product | null;
  setEditingProduct: (product: Product | null) => void;
}

export const useProductUpdateForm = ({
  products,
  editingProduct,
  setEditingProduct,
}: UseProductUpdateFormProps) => {
  const [newDiscount, setNewDiscount] = useState<Discount>({
    quantity: 0,
    rate: 0,
  });

  const onProductUpdate = useSetAtom(updateProductAtom);

  const handleEditComplete = () => {
    if (editingProduct) {
      onProductUpdate(editingProduct);
      setEditingProduct(null);
    }
  };

  const handleProductNameUpdate = (productId: string, newName: string) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, name: newName };
      setEditingProduct(updatedProduct);
    }
  };

  const handleStockUpdate = (productId: string, newStock: number) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct) {
      const newProduct = { ...updatedProduct, stock: newStock };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
    }
  };

  const handlePriceUpdate = (productId: string, newPrice: number) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, price: newPrice };
      setEditingProduct(updatedProduct);
    }
  };

  const handleAddDiscount = (productId: string) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct && editingProduct) {
      const newProduct = {
        ...updatedProduct,
        discounts: [...updatedProduct.discounts, newDiscount],
      };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
      setNewDiscount({ quantity: 0, rate: 0 });
    }
  };

  const handleRemoveDiscount = (productId: string, index: number) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct) {
      const newProduct = {
        ...updatedProduct,
        discounts: updatedProduct.discounts.filter((_, i) => i !== index),
      };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
    }
  };

  const handleChangeDiscountRate = (discountRate: number) => {
    setNewDiscount({
      ...newDiscount,
      rate: discountRate,
    });
  };

  const handleChangeDiscountQuantity = (discountQuantity: number) => {
    setNewDiscount({
      ...newDiscount,
      quantity: discountQuantity,
    });
  };

  return {
    handleEditComplete,
    handleProductNameUpdate,
    handleStockUpdate,
    handlePriceUpdate,
    handleAddDiscount,
    handleRemoveDiscount,
    handleChangeDiscountRate,
    handleChangeDiscountQuantity,
    newDiscount,
  };
};
