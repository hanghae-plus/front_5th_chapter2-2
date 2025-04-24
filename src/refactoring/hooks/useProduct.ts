import {useState} from "react";
import {Product} from "../../types.ts";
import {initialProducts} from "../data/InitialInfo.tsx";

export const useProducts = (initialData: Product[] = initialProducts) => {
  const [products, setProducts] = useState<Product[]>(initialData);

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const addProduct = (newProduct: Product) => {
    setProducts(prevProducts => [...prevProducts, newProduct]);
  };

  return {
    products,
    updateProduct,
    addProduct,
  };
};
