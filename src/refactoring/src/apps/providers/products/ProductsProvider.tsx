import { ReactNode, useState } from "react";
import { ProductStoreContext } from "../../../entities/product/stores/product.stores";
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
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedProductId, setSelectedProductId] = useState<string>("");

  const store = {
    products,
    selectedProductId,
    setSelectedProductId: (id: string) => {
      setSelectedProductId(id);
      return store;
    },
    addProduct: (newProduct: Product) => {
      setProducts((prevProducts) => [...prevProducts, newProduct]);
      return store;
    },
    updateProduct: (updatedProduct: Product) => {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
      return store;
    },
    removeProduct: (productId: string) => {
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
      return store;
    },
    findProductById: (id: string) => {
      return products.find((product) => product.id === id);
    },
  };

  return (
    <ProductStoreContext.Provider value={store}>
      {children}
    </ProductStoreContext.Provider>
  );
};
