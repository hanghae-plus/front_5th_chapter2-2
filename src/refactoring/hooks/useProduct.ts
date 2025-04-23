import { useState } from 'react';
import { Product } from '../../types.ts';

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  function updateProduct(product: Partial<Product>) {
    setProducts((prevProducts) => {
      const targetIndex = prevProducts.findIndex((p) => p.id === product.id);
      if (targetIndex === -1) {
        throw new Error(`Product with id ${product.id} not found`);
      } else {
        const updatedProducts = [...prevProducts];
        updatedProducts[targetIndex] = {
          ...updatedProducts[targetIndex],
          ...product,
        };
        return updatedProducts;
      }
    });
  }

  function addProduct(newProduct: Product) {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  }

  return {
    products,
    updateProduct,
    addProduct,
  };
};
