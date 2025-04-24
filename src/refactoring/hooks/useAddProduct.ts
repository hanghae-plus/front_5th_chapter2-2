import { useState } from 'react';
import { Product } from '../../types';

export default function useAddProduct({
  onProductAdd,
  setShowNewProductForm
}: {
  onProductAdd: (product: Product) => void;
  setShowNewProductForm: (show: boolean) => void;
}) {
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    stock: 0,
    discounts: []
  });

  const handleAddNewProduct = () => {
    const productWithId = { ...newProduct, id: Date.now().toString() };
    onProductAdd(productWithId);
    setNewProduct({
      name: '',
      price: 0,
      stock: 0,
      discounts: []
    });
    setShowNewProductForm(false);
  };

  return {
    newProduct,
    setNewProduct,
    handleAddNewProduct
  };
}
