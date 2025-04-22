import { useState } from 'react';
import { Product } from '../../types.ts';

const updateProductInList = (products: Product[], updatedProduct: Product) => {
  return products.map((product) => (product.id === updatedProduct.id ? updatedProduct : product));
};

const addProductToList = (products: Product[], newProduct: Product) => {
  return [...products, newProduct];
};

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const updateProduct = (updatedProduct: Product) => {
    setProducts(updateProductInList(products, updatedProduct));
  };

  const addProduct = (newProduct: Product) => {
    setProducts(addProductToList(products, newProduct));
  };

  return {
    products,
    updateProduct,
    addProduct,
  };
};
