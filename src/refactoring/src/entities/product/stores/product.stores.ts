import { createContext } from "react";
import { Product } from "../types";

export interface ProductStore {
  products: Product[];
  selectedProductId: string;
  setSelectedProductId: (id: string) => void;
  addProduct: (newProduct: Product) => void;
  updateProduct: (updatedProduct: Product) => void;
  removeProduct: (productId: string) => void;
  findProductById: (id: string) => Product | undefined;
}

export const createProductStore = (
  initialProducts: Product[],
): ProductStore => {
  let products = [...initialProducts];
  let selectedProductId = "";

  return {
    products,
    selectedProductId,

    setSelectedProductId: (id: string) => {
      selectedProductId = id;
      return createProductStore(products);
    },

    addProduct: (newProduct: Product) => {
      products = [...products, newProduct];
      return createProductStore(products);
    },

    updateProduct: (updatedProduct: Product) => {
      products = products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product,
      );
      return createProductStore(products);
    },

    removeProduct: (productId: string) => {
      products = products.filter((product) => product.id !== productId);
      return createProductStore(products);
    },

    findProductById: (id: string) => {
      return products.find((product) => product.id === id);
    },
  };
};

export const ProductStoreContext = createContext<ProductStore | undefined>(
  undefined,
);
