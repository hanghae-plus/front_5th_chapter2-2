import { useState } from 'react';
import { Product } from '../../types.ts';
import { INITIAL_PRODUCTS } from '../_constants/product.ts';

export const useProducts = (initialProducts?: Product[]) => {
  const [products, setProducts] = useState<Product[]>(initialProducts || INITIAL_PRODUCTS);

  // 상품 업데이트
  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))
    );
  };

  // 상품 추가
  const handleAddProduct = (newProduct: Product) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  return {
    products: products,
    updateProduct: handleUpdateProduct,
    addProduct: handleAddProduct,
  };
};
