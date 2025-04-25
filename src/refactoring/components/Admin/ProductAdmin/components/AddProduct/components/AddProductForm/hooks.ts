import { Dispatch, SetStateAction, useState } from 'react';
import { Product } from '../../../../../../../../types.ts';
import { defaultProduct } from '../../../../data.ts';

export const useGetProductAddHandler = (
  onProductAdd: (newProduct: Product) => void,
  setShowNewProductForm: Dispatch<SetStateAction<boolean>>,
) => {
  const [newProduct, setNewProduct] =
    useState<Omit<Product, 'id'>>(defaultProduct);

  const handleAddNewProduct = () => {
    const productWithId: Product = { ...newProduct, id: Date.now().toString() };
    onProductAdd(productWithId);

    // 폼 초기화
    setNewProduct(defaultProduct);
    setShowNewProductForm(false);
  };
  return { newProduct, setNewProduct, handleAddNewProduct };
};
