import { useProducts } from "@/refactoring/hooks";
import { Product } from "@/types";
import { createContext, ReactNode, useContext } from "react";

type ProductContextType = ReturnType<typeof useProducts>;
const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider = ({ initialProducts, children }: { initialProducts: Product[]; children: ReactNode }) => {
  const value = useProducts(initialProducts);
  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error("context is null");
  return context;
};
