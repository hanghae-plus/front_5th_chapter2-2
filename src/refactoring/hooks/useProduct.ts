import { useState } from "react";
import { Product } from "../../types.ts";

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState<Product[]>(() => initialProducts);

  const updateProduct = (updatedProduct: Product) => {
    setProducts((products) =>
      products.map((product) =>
        product.id === updatedProduct.id
          ? { ...product, ...updatedProduct }
          : product,
      ),
    );
  };

  const addProduct = (product: Product) => {
    setProducts((products) => [...products, product]);
  };

  return {
    products,
    updateProduct,
    addProduct,
  };
};
