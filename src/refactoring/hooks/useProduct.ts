import { useState } from "react";
import { Product } from "../../types.ts";

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const updateProduct = (updatedProduct: Partial<Product>) => {
    setProducts((prevProducts) => {
      return prevProducts.map((products) => {
        if (products.id === updatedProduct.id) {
          return { ...products, ...updatedProduct };
        }
        return products;
      });
    });
  };

  const addProduct = (newProduct: Product) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  return {
    products,
    updateProduct,
    addProduct,
  };
};
