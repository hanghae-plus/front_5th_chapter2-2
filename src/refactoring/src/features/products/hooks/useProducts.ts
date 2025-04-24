import { useContext } from "react";
import { ProductStoreContext } from "../../../entities/product/stores";
import { Product } from "../../../entities/product/types";

export const useProducts = () => {
  const store = useContext(ProductStoreContext);

  if (!store) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }

  const { products, selectedProductId } = store;

  const addProduct = (newProduct: Product): void => {
    store.addProduct(newProduct);
  };

  const updateProduct = (updatedProduct: Product): void => {
    store.updateProduct(updatedProduct);
  };

  const removeProduct = (productId: string): void => {
    store.removeProduct(productId);
  };

  const findProductById = (id: string): Product | undefined => {
    return store.findProductById(id);
  };

  const setSelectedProductId = (id: string): void => {
    store.setSelectedProductId(id);
  };

  return {
    products,
    selectedProductId,
    setSelectedProductId,
    addProduct,
    updateProduct,
    removeProduct,
    findProductById,
  };
};
