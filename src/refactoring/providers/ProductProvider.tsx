import { useProducts } from "@/refactoring/hooks";
import { Product } from "@/types";
import { createContext, ReactNode } from "react";

type ProductContextType = ReturnType<typeof useProducts>;
export const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider = ({ initialProducts, children }: { initialProducts: Product[]; children: ReactNode }) => {
  const value = useProducts(initialProducts);
  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};
