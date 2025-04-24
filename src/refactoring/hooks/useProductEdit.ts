import { useState } from 'react';
import { Product } from '../../types';

export const useProductEdit = (
  onProductUpdate: (updatedProduct: Product) => void,
  products: Product[],
) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const updateProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };

  const handleProductNameUpdate = (productId: string, name: string) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct) {
      const newProduct = { ...updatedProduct, name };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
    }
  };

  const handlePriceUpdate = (productId: string, price: number) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct) {
      const newProduct = { ...updatedProduct, price };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
    }
  };

  const handleStockUpdate = (productId: string, stock: number) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct) {
      const newProduct = { ...updatedProduct, stock };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
    }
  };

  const handleEditComplete = () => {
    if (editingProduct) {
      onProductUpdate(editingProduct);
      setEditingProduct(null);
    }
  };

  return {
    editingProduct,
    setEditingProduct,
    updateProduct,
    handleEditComplete,
    handlePriceUpdate,
    handleStockUpdate,
    handleProductNameUpdate,
  };
};
