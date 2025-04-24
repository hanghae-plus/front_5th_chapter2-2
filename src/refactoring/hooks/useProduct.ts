import { useCallback, useState } from "react";
import { Product } from "../../types.ts";

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState(initialProducts);

  const updateProduct = useCallback((targetProduct: Product) => {
    setProducts((prevProducts) => {
      const index = prevProducts.findIndex((product) => product.id === targetProduct.id);
      if (index !== -1) {
        const updatedProducts = [...prevProducts];
        updatedProducts[index] = targetProduct;
        return updatedProducts;
      }
      return [...prevProducts, targetProduct];
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
