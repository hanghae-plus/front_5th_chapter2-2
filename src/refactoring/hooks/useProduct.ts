import { useEffect, useState } from "react";
import { Product } from "../../types.ts";

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  
  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  const updateProduct = (updatedProduct: Product) => {
    setProducts(products.map(product => product.id === updatedProduct.id ? updatedProduct : product));
  };

  const addProduct = (newProduct: Product) => {
    setProducts([...products, newProduct]);
  };

  return {
    products,
    updateProduct,
    addProduct,
  };
};
