import { useState, useCallback } from 'react';
import { Product } from '@/types';
import { updateProductList } from '@/models';

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const updateProduct = useCallback((product: Product) => {
    setProducts((prevProducts) => updateProductList(prevProducts, product));
  }, []);

  const addProduct = useCallback((newProduct: Product) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  }, []);

  return {
    products,
    updateProduct,
    addProduct,
  };
};
