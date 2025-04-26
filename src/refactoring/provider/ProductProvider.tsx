import React, { createContext, useContext } from "react";
import { useProducts } from "../hooks";
import { Product } from "@/types";

interface ProductContext {
  products: Product[];
  updateProduct: (updatedProduct: Product) => void;
  addProduct: (newProduct: Product) => void;
}

interface ProviderProps {
  children: React.ReactNode;
  initialProducts: Product[];
}

const ProductContext = createContext<ProductContext | undefined>(undefined);

export const ProductProvider = ({
  children,
  initialProducts,
}: ProviderProps) => {
  const { products, updateProduct, addProduct } = useProducts(initialProducts);

  return (
    <ProductContext.Provider value={{ products, updateProduct, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error(
      "useProducts는 반드시 ProductProvider 내부에 위치해야합니다.",
    );
  }

  return context;
};
