import { useContext } from "react";
import { ProductStoreContext } from "../../../entities/product/stores";
import { Product } from "../../../entities/product/types";

export const useProducts = () => {
  const store = useContext(ProductStoreContext);

  if (!store) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }

  const { products } = store;

  const addProduct = (newProduct: Product): void => {
    store.addProduct(newProduct);
  };

  const updateProduct = (updatedProduct: Product): void => {
    store.updateProduct(updatedProduct);
  };

  const removeProduct = (productId: string): void => {
    store.removeProduct(productId);
  };

  return {
    products,
    addProduct,
    updateProduct,
    removeProduct,
  };
};
