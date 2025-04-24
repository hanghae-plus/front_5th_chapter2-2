import { createContext } from "react";
import { Product } from "../types";

export interface ProductStore {
  products: Product[];
  selectedProductId: string;
  setSelectedProductId: (id: string) => ProductStore;
  addProduct: (newProduct: Product) => ProductStore;
  updateProduct: (updatedProduct: Product) => ProductStore;
  removeProduct: (productId: string) => ProductStore;
  findProductById: (id: string) => Product | undefined;
}

export const createProductStore = (
  initialProducts: Product[],
  initialSelectedProductId: string = "",
): ProductStore => {
  const products = [...initialProducts];
  const selectedProductId = initialSelectedProductId;

  return {
    products,
    selectedProductId,

    setSelectedProductId: (id: string) => {
      return createProductStore(products, id);
    },

    addProduct: (newProduct: Product) => {
      return createProductStore([...products, newProduct], selectedProductId);
    },

    updateProduct: (updatedProduct: Product) => {
      return createProductStore(
        products.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product,
        ),
        selectedProductId,
      );
    },

    removeProduct: (productId: string) => {
      return createProductStore(
        products.filter((product) => product.id !== productId),
        selectedProductId,
      );
    },

    findProductById: (id: string) => {
      return products.find((product) => product.id === id);
    },
  };
};

export const ProductStoreContext = createContext<ProductStore | undefined>(
  undefined,
);
