import { useState } from "react";
import { Product } from "../../types.ts";

export const useProducts = (initialProducts: Product[]) => {
  const [product, setProduct] = useState<Product[]>(() => initialProducts);

  const handleUpdateProduct = (updateProduct: Product) => {
    setProduct((prev) => {
      return prev.map((product) =>
        product.id === updateProduct.id ? { ...updateProduct } : { ...product }
      );
    });
  };

  const handleAddProduct = (newProduct: Product) => {
    setProduct((prev) => {
      return [...prev, newProduct];
    });
  };

  return {
    products: product,
    updateProduct: handleUpdateProduct,
    addProduct: handleAddProduct,
  };
};
