import { useState, useCallback } from 'react';
import { Product } from '../../types.ts';

interface UseAdminNewProductProps {
  onProductAdd: (newProduct: Product) => void;
}

const INITIAL_NEW_PRODUCT: Omit<Product, 'id'> = {
  name: '',
  price: 0,
  stock: 0,
  discounts: [],
};

export const useAdminNewProduct = ({ onProductAdd }: UseAdminNewProductProps) => {
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>(INITIAL_NEW_PRODUCT);

  const toggleNewProductForm = useCallback(() => {
    setShowNewProductForm((prev) => !prev);
  }, []);

  const updateProductName = useCallback((name: string) => {
    setNewProduct((prev) => ({ ...prev, name }));
  }, []);

  const updateProductPrice = useCallback((price: number) => {
    setNewProduct((prev) => ({ ...prev, price }));
  }, []);

  const updateProductStock = useCallback((stock: number) => {
    setNewProduct((prev) => ({ ...prev, stock }));
  }, []);

  const resetProductState = useCallback(() => {
    setNewProduct(INITIAL_NEW_PRODUCT);
    setShowNewProductForm(false);
  }, []);

  const addNewProduct = useCallback(() => {
    const newProductItem = { ...newProduct, id: Date.now().toString() };

    onProductAdd(newProductItem);
    resetProductState();
  }, [newProduct, onProductAdd, resetProductState]);

  return {
    newProduct,
    showNewProductForm,
    toggleNewProductForm,
    updateProductName,
    updateProductPrice,
    updateProductStock,
    addNewProduct,
  };
};
