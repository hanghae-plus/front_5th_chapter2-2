import { createContext, useContext } from "react";

import { Product, useProducts } from "@r/entities/product";

const ProductContext = createContext<ReturnType<typeof useProducts> | null>(
  null
);

export const ProductProvider = ({
  children,
  initialProducts,
}: {
  children: React.ReactNode;
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
  if (!context)
    throw new Error("useProductContext must be used within ProductProvider");
  return context;
};
