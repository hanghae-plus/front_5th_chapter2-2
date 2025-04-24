import { useProducts } from "@/refactoring/hooks";
import { Product } from "@/types";
import { createContext, ReactNode, useContext } from "react";

type ProductContextType = ReturnType<typeof useProducts>;
const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider = ({
  products = initialProducts,
  children,
}: {
  products?: Product[];
  children: ReactNode;
}) => {
  const value = useProducts(products);
  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error("context is null");
  return context;
};

const initialProducts: Product[] = [
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
