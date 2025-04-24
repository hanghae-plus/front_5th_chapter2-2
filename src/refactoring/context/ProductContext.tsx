import React, { createContext, useContext } from 'react';
import { Product } from '../../types';
import { DEFAULT_PRODUCTS } from '../constants/default';
import { useProducts } from '../hooks';


interface ProductContextInterface {
  products: Product[];
  updateProduct: (product: Product) => void;
  addProduct: (newProduct: Product) => void;
}

const ProductContext = createContext<ProductContextInterface | undefined>(
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

export const useProductContext = (): ProductContextInterface => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error(
      'useProductContext is not defined within a ProductProvider',
    );
  }
  return context;
};