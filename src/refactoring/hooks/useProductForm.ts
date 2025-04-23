// src/features/products/hooks/useProductManager.ts

import { useState } from 'react';
import {
  updateProductName,
  updateProductPrice,
  updateProductStock,
  addDiscount,
  removeDiscount,
} from '../models/admin';
import { Product, Discount } from '../../types';

interface UseProductManagerProps {
  products: Product[];
  onProductUpdate: (product: Product) => void;
  onProductAdd: (product: Product) => void;
}

export const useProductManager = ({ products, onProductUpdate, onProductAdd }: UseProductManagerProps) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newDiscount, setNewDiscount] = useState<Discount>({ quantity: 0, rate: 0 });
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    stock: 0,
    discounts: [],
  });

  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };

  const handleProductNameUpdate = (productId: string, newName: string) => {
    if (editingProduct?.id === productId) {
      setEditingProduct(updateProductName(editingProduct, newName));
    }
  };

  const handlePriceUpdate = (productId: string, newPrice: number) => {
    if (editingProduct?.id === productId) {
      setEditingProduct(updateProductPrice(editingProduct, newPrice));
    }
  };

  const handleEditComplete = () => {
    if (editingProduct) {
      onProductUpdate(editingProduct);
      setEditingProduct(null);
    }
  };

  const handleStockUpdate = (productId: string, newStock: number) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      const updated = updateProductStock(product, newStock);
      onProductUpdate(updated);
      setEditingProduct(updated);
    }
  };

  const handleAddDiscount = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product && editingProduct) {
      const updated = addDiscount(product, newDiscount);
      onProductUpdate(updated);
      setEditingProduct(updated);
      setNewDiscount({ quantity: 0, rate: 0 });
    }
  };

  const handleRemoveDiscount = (productId: string, index: number) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      const updated = removeDiscount(product, index);
      onProductUpdate(updated);
      setEditingProduct(updated);
    }
  };

  const handleAddNewProduct = () => {
    const productWithId = { ...newProduct, id: Date.now().toString() };
    onProductAdd(productWithId);
    setNewProduct({ name: '', price: 0, stock: 0, discounts: [] });
  };

  return {
    editingProduct,
    newProduct,
    newDiscount,
    setNewDiscount,
    setNewProduct,
    handleEditProduct,
    handleProductNameUpdate,
    handlePriceUpdate,
    handleEditComplete,
    handleStockUpdate,
    handleAddDiscount,
    handleRemoveDiscount,
    handleAddNewProduct,
  };
};
