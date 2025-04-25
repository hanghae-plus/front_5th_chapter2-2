import { useState } from 'react';
import { Product } from '../../../types.ts';
import { createContextHook } from '../../libs/createContextHook.tsx';

const initialProducts: Product[] = [
  {
    id: 'p1',
    name: '상품1',
    price: 10000,
    stock: 20,
    discounts: [
      { quantity: 10, rate: 0.1 },
      { quantity: 20, rate: 0.2 }
    ]
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

export const useProductsStore = (initialProductsValue: Product[] = initialProducts) => {
  const [products, setProducts] = useState<Product[]>(initialProductsValue);

  function updateProduct(product: Product) {
    setProducts((prevProducts) => prevProducts.map((p) => (p.id === product.id ? product : p)));
  }

  function addProduct(product: Product) {
    setProducts((prevProducts) => [...prevProducts, product]);
  }

  return {
    products,
    setProducts,
    updateProduct,
    addProduct
  };
};

export const [ProductProvider, useProducts] = createContextHook(useProductsStore);
