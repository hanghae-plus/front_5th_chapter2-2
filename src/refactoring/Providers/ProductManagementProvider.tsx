import { useContext } from "react";
import React from "react";
import { useProductManage } from "../hooks/useProductManage.ts";

const ProductManagementContext = React.createContext<
  ReturnType<typeof useProductManage> | undefined
>(undefined);

export const useProductManagementContext = () => {
  const context = useContext(ProductManagementContext);
  if (!context)
    throw new Error(
      "useProductManagementContext must be used within ProductProvider",
    );
  return context;
};

export const ProductManagementProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const cartHelper = useProductManage();

  return (
    <ProductManagementContext.Provider value={cartHelper}>
      {children}
    </ProductManagementContext.Provider>
  );
};
