import React from "react";
import { Product } from "../../types";
import { ProductsContext } from "../context";
import { useProducts } from "../hooks";

export const initialProducts = [
  {
    id: "p1",
    name: "상품1",
    price: 10000,
    stock: 20,
    discounts: [
      { quantity: 10, rate: 0.1 },
      { quantity: 20, rate: 0.2 },
    ],
  },
  {
    id: "p2",
    name: "상품2",
    price: 20000,
    stock: 20,
    discounts: [{ quantity: 10, rate: 0.15 }],
  },
  {
    id: "p3",
    name: "상품3",
    price: 30000,
    stock: 20,
    discounts: [{ quantity: 10, rate: 0.2 }],
  },
];

interface ProductProviderType {
  initialProducts: Product[];
  children: React.ReactNode;
}

export const ProductsProvider: React.FC<ProductProviderType> = ({
  initialProducts,
  children,
}: ProductProviderType) => {
  const productsContextValue = useProducts(initialProducts);

  return (
    <ProductsContext.Provider value={productsContextValue}>
      {children}
    </ProductsContext.Provider>
  );
};
