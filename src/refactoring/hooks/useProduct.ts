import { useState, useCallback, useContext } from "react";
import { ProductsContext } from "../context";
import { Product } from "../../types";

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const updateProduct = useCallback(
    (updatedProduct: Product) => {
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === updatedProduct.id ? updatedProduct : p
        )
      );
    },
    [products]
  );

  const addProduct = useCallback(
    (newProduct: Product) => {
      setProducts((prevProducts) => [...prevProducts, newProduct]);
    },
    [products]
  );

  return {
    products,
    updateProduct,
    addProduct,
  };
};

export const useProductsContext = () => {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error(
      "useProductsContext hook must be used within ProductContext Provider!"
    );
  }
  return context;
};
