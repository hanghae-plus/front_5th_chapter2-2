import { useState } from "react";
import { Product } from "../../types.ts";

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const addProduct = (newProduct: Product) => {
    setProducts((prev) => [...prev, newProduct]);
  }

  const updateProduct = (updatedProduct: Product) => {
    //update할때 모든 아이디에 문자열 a 추가
    setProducts((prev) => {

      //같은 id이면 업데이트된것만 포함되어야해.
      const updatedProducts = prev.filter(product => product.id !== updatedProduct.id);
      return [...updatedProducts, updatedProduct];

    });
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct({...product});
  };


  return {
    products: products,
    updateProduct,
    addProduct,
    // toggleProductAccordion,
    handleEditProduct,
    // openProductIds,
    editingProduct,
  };
};
