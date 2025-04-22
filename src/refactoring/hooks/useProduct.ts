import { useCallback, useState } from "react";
import { Product } from "../../types.ts";

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState(initialProducts);

  const updateProduct = useCallback((targetProduct: Product) => {
    setProducts((prevProducts) => {
      const filteredProducts = prevProducts.filter((product) => product.id !== targetProduct.id);
      return [
        ...filteredProducts,
        targetProduct,
      ]
    });
  }, []);

  const addProduct = useCallback((product: Product) => {
    setProducts((prevProducts) => {
      return [
        ...prevProducts,
        product,
      ]
    })
  }, []);

  return {
    products,
    updateProduct,
    addProduct,
  };
};
