import { useState } from "react";
import { Product } from "../../types.ts";

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const updateProduct = (newProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === newProduct.id ? newProduct : product
      )
    );
  };

  const addProduct = (product: Product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  return {
    products,
    updateProduct,
    addProduct,
  };
};
