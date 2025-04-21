import { useState } from "react";
import { Product } from "../../types.ts";

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const updateProduct = (updateProduct: Product) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        // 중복에 대한 처리
        product.id === updateProduct.id ? { ...product, ...updateProduct } : product
      )
    );
  }
  const addProduct = (newProduct: Product) => {
    setProducts(prevProducts => [...prevProducts, newProduct]);
  }
  return {
    products: products,
    updateProduct: updateProduct,
    addProduct: addProduct,
  };
};
