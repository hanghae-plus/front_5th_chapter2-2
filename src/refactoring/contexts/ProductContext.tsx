import { createContext, ReactNode, useContext } from "react";
import { useProducts } from "../hooks";
import { Product } from "../../types";

type ProductContextProps = ReturnType<typeof useProducts>;

const ProductContext = createContext<ProductContextProps | null>(null);

export const ProductProvider = ({
  children,
  initialProducts,
}: {
  children: ReactNode;
  initialProducts: Product[];
}) => {
  const productState = useProducts(initialProducts);

  return (
    <ProductContext.Provider value={productState}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
