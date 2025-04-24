import React, { createContext, useContext } from 'react';
import type { Product } from '@/types';

import { useProducts } from '@/hooks';
import { DEFAULT_PRODUCTS } from '@/constants';

interface ProductContextValue {
  products: Product[];
  updateProduct: (product: Product) => void;
  addProduct: (newProduct: Product) => void;
}

const ProductContext = createContext<ProductContextValue | undefined>(
  undefined,
);

interface ProductProviderProps {
  children: React.ReactNode;
  initialProducts?: Product[];
}

export const ProductProvider: React.FC<ProductProviderProps> = (props) => {
  const { children, initialProducts = DEFAULT_PRODUCTS } = props;
  const { products, updateProduct, addProduct } = useProducts(initialProducts);

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
