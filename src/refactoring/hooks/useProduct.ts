import { useState } from 'react';
import { Product } from '../../types.ts';
import { INITIAL_PRODUCTS } from '../constants/initData.ts';

export const useProducts = (initialProducts: Product[] = INITIAL_PRODUCTS) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prevProducts =>
      prevProducts.map(product => (product.id === updatedProduct.id ? updatedProduct : product))
    );
  };

  const addProduct = (newProduct: Product) => {
    setProducts(prevProducts => [...prevProducts, newProduct]);
  };

  return {
    products,
    updateProduct,
    addProduct
  };
};
