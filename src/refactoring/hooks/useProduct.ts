import { useState } from 'react';
import { Product } from '../../types.ts';

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const updateProduct = (product: Product) =>
    setProducts((prevProducts) =>
      prevProducts.map((prevProduct) => (prevProduct.id === product.id ? product : prevProduct)),
    );

  const addProduct = (product: Product) =>
    setProducts((prevProducts) => [...prevProducts, product]);

  return {
    products,
    updateProduct,
    addProduct,
  };
};
