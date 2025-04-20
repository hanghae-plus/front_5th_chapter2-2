import { useState } from "react";
import { Product } from "../../types.ts";

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState(initialProducts);

  const updateProduct = (updateProduct: Product) => {
    setProducts(
      products.map((product) => {
        if (product.id === updateProduct.id) {
          return updateProduct;
        }
        return product;
      })
    );
  };

  const addProduct = (addProduct: Product) => {
    setProducts((prev) => [...prev, addProduct]);
  };
  return {
    products,
    updateProduct,
    addProduct,
  };
};
