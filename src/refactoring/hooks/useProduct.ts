import { useState } from 'react';
import { Product } from '../../types.ts';

//계산
function updateProduct(products: Product[], newProduct: Product) {
  return products.map((product) =>
    product.id === newProduct.id ? newProduct : product,
  );
}

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState(initialProducts);

  return {
    products: products,
    updateProduct: (newProduct: Product) =>
      setProducts((prev) => updateProduct(prev, newProduct)),
    addProduct: (newProduct: Product) =>
      setProducts((prev) => [...prev, newProduct]),
  };
};
