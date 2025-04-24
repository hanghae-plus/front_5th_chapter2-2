import { useState } from 'react';
import { Product, Discount } from '../../types';

export const useEditProduct = (
  onProductUpdate: (updatedProduct: Product) => void,
) => {
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

  const handleProductNameUpdate = (productId: string, newName: string) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, name: newName };
      handleEditProduct(updatedProduct);
    }
  };

  const handlePriceUpdate = (productId: string, newPrice: number) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, price: newPrice };
      handleEditProduct(updatedProduct);
    }
  };

  const handleStockUpdate = (productId: string, newStock: number) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, stock: newStock };
      handleEditProduct(updatedProduct);
    }
  };

  const handleRemoveDiscount = (productId: string, index: number) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = {
        ...editingProduct,
        discounts: editingProduct.discounts.filter((_, i) => i !== index),
      };
      handleEditProduct(updatedProduct);
    }
  };

  const handleAddDiscount = (productId: string, discount: Discount) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = {
        ...editingProduct,
        discounts: [...editingProduct.discounts, discount],
      };
      handleEditProduct(updatedProduct);
    }
  };

  return {
    editingProduct,
    handleEditProduct,
    handleEditComplete,
    handleProductNameUpdate,
    handlePriceUpdate,
    handleStockUpdate,
    handleRemoveDiscount,
    handleAddDiscount,
  };
};
