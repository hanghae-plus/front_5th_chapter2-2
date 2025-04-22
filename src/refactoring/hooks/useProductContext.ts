import { ProductContext } from "@/refactoring/providers";
import { useContext } from "react";

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error("context is null");
  return context;
};
