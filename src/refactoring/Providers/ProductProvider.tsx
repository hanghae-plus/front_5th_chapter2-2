import { Product } from "../../types.ts";
import { useContext, useState } from "react";
import React from "react";
import { INITIAL_PRODUCTS } from "../utils/constants.ts";

interface IProductContextType {
  products: Product[];
  updateProduct: (updateProduct: Product) => void;
  addProduct: (newProduct: Product) => void;
}

const ProductContext = React.createContext<IProductContextType | undefined>(
  undefined,
);

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context)
    throw new Error("useProductContext must be used within ProductProvider");
  return context;
};

export const ProductProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const updateProduct = (updateProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        // 중복에 대한 처리
        product.id === updateProduct.id
          ? { ...product, ...updateProduct }
          : product,
      ),
    );
  };
  const addProduct = (newProduct: Product) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  return (
    <ProductContext.Provider value={{ products, updateProduct, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
