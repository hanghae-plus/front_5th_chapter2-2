import { ReactNode } from "react";
import {
  ProductStoreContext,
  createProductStore,
} from "../../../entities/product/stores/product.stores";
import { Product } from "../../../entities/product/types";
import { INITIAL_PRODUCTS } from "./product.constants";

interface ProductsProviderProps {
  children: ReactNode;
  initialProducts?: Product[];
}

export const ProductsProvider = ({
  children,
  initialProducts = INITIAL_PRODUCTS,
}: ProductsProviderProps) => {
  const store = createProductStore(initialProducts);

  return (
    <ProductStoreContext.Provider value={store}>
      {children}
    </ProductStoreContext.Provider>
  );
};
