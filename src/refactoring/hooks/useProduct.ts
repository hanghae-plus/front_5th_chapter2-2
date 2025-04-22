import { useCallback, useState } from "react";
import { Product } from "../../types.ts";

const initialProducts: Product[] = [
  {
    id: 'p1',
    name: '상품1',
    price: 10000,
    stock: 20,
    discounts: [{ quantity: 10, rate: 0.1 }, { quantity: 20, rate: 0.2 }]
  },
  {
    id: 'p2',
    name: '상품2',
    price: 20000,
    stock: 20,
    discounts: [{ quantity: 10, rate: 0.15 }]
  },
  {
    id: 'p3',
    name: '상품3',
    price: 30000,
    stock: 20,
    discounts: [{ quantity: 10, rate: 0.2 }]
  }
];

export const useProducts = (newProducts?: Product[]) => {
  const [products, setProducts] = useState(newProducts ? newProducts : initialProducts)

  const updateProduct = useCallback((updatedProduct: Product) => {
    setProducts(prevProducts =>
      prevProducts.map(p => p.id === updatedProduct.id ? updatedProduct : p)
    );
  }, [])

  const addProduct = useCallback((newProduct: Product) => {
    setProducts(prevProducts => [...prevProducts, newProduct]);
  }, [])

  return {
    products,
    updateProduct,
    addProduct,
  };
};
