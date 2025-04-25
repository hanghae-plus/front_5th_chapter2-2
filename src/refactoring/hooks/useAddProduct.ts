import { useState } from 'react';
import { Product } from '../../types';
import { INIT_PRODUCT } from '../constants/initData';

export default function useAddProduct({
  onProductAdd,
  setShowNewProductForm
}: {
  onProductAdd: (product: Product) => void;
  setShowNewProductForm: (show: boolean) => void;
}) {
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>(INIT_PRODUCT);

  const handleAddNewProduct = () => {
    const productWithId = { ...newProduct, id: Date.now().toString() };
    onProductAdd(productWithId);
    setNewProduct(productWithId);
    setShowNewProductForm(false);
  };

  return {
    newProduct,
    setNewProduct,
    handleAddNewProduct
  };
}
