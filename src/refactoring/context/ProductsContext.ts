import { createContext } from "react";
import {Product} from "../../types"

export interface ProductsContextType {
    products: Product[];
    updateProduct: (updatedProduct: Product) => void;
    addProduct: (updatedProduct: Product) => void;
}

export const ProductsContext = createContext<ProductsContextType | undefined>(undefined)