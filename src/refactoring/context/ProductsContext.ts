import { createContext } from "react";
import { Product } from "../../types";

export interface ProductsContextType {
  products: Product[];
  updateProduct: (product: Product) => void;
  addProduct: (product: Product) => void;
}

export const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);
