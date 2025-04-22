import { createContext, useState } from "react";
import type { IProduct } from "#src/types";

const initialProducts: IProduct[] = [
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

export const ProductContext = createContext<{
  products: IProduct[];
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
}>({
  products: [],
  setProducts: () => {},
});

const ProductProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [products, setProducts] = useState<IProduct[]>(initialProducts);

  return <ProductContext.Provider value={{ products, setProducts }}>{children}</ProductContext.Provider>;
};

export default ProductProvider;
