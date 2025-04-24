import { useState } from "react";
import { Product } from "../../types.ts";

/**
 * Q1. let vs useState
 * react의 렌더링 사이클이 state의 변경에 반영하기 때문에 let 을 변경해도 리렌더링 안됨
 */

/**
 * Q2. useState([...initialProducts]) 안해도되는 이유?
 * 각 컴포넌트 인스턴스는 자신만의 호출 순서를 가지므로, 상태가 독립적으로 관리됨.
 * => 인스턴스 형식이라 모두 다른 products 가 되기 때문
 */

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState(initialProducts);

  const updateProduct = (_product: Product) => {
    setProducts([_product]);
  };

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  return {
    products: products,
    updateProduct: updateProduct,
    addProduct: addProduct,
  };
};

// Q1. let vs useState
// let products = [...initialProducts];
// // const updateProduct = () => {};
// const addProduct = () => {};

// const updateProduct = (product: Product) => {
//   const newProduct = [product];
//   products = newProduct;
// };

// const addProduct = (product: Product) => {
//   products.push(product);
// };
