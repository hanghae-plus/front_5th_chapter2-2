import React, { createContext, useContext } from 'react';
import type { Product } from '../../types';

import { useProducts } from '../hooks';
import { DEFAULT_PRODUCTS } from '../constants';

interface ProductContextValue {
  products: Product[];
  updateProduct: (product: Product) => void;
  addProduct: (newProduct: Product) => void;
}

const ProductContext = createContext<ProductContextValue | null>(null);

interface ProductProviderProps {
  children: React.ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = (props) => {
  const { children } = props;
  const { products, updateProduct, addProduct } = useProducts(DEFAULT_PRODUCTS);

  return (
    <ProductContext.Provider value={{ products, updateProduct, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = (): ProductContextValue => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error(
      'useProductContext is not defined within a ProductProvider',
    );
  }
  return context;
};
