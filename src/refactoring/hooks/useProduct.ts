import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";

export const useProducts = () => {
  const context = useContext(ProductsContext)
  if(context === undefined) {
    throw new Error("Hook must be used wuthn a Provider!")
  }
  return context
};
