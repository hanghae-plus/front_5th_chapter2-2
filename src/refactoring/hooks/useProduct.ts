import { useState } from 'react';
import { Product } from '../../types.ts';

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState(initialProducts);

  return {
    products: products,
    updateProduct: (newProduct: Product) =>
      setProducts((prev) =>
        prev.map((product) =>
          product.id === newProduct.id ? newProduct : product,
        ),
      ),
    addProduct: (newProduct: Product) =>
      setProducts((prev) => [...prev, newProduct]),
  };
};
