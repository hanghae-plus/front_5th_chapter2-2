import { createContext, useEffect, useState } from "react";
import type { IProduct } from "#src/types";
import useLocalStorage from "#src/refactoring/hooks/useLocalStorage";

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

export const ProductsContext = createContext<{
  products: IProduct[];
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
}>({
  products: [],
  setProducts: () => {},
});

const ProductsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [localStorageProducts, setProductsToLocalStorage] = useLocalStorage<IProduct[]>("products");
  const [products, setProducts] = useState<IProduct[]>(localStorageProducts ?? initialProducts);

  useEffect(() => {
    setProductsToLocalStorage(products);
  }, [products, setProductsToLocalStorage]);

  return <ProductsContext.Provider value={{ products, setProducts }}>{children}</ProductsContext.Provider>;
};

export default ProductsProvider;
