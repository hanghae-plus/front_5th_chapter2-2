import { useState } from "react";
import { Product } from "../../types.ts";

/**
 * Q1. let vs useState
 * react의 렌더링 사이클이 state의 변경에 반영하기 때문에 let 을 변경해도 리렌더링 안됨
 *
 */

/**
 * Q2. 이거 useState([...initialProducts]) 안해도되는 이유?
 * 내부적으로 싱글톤 패턴이 적용중이라 인스턴스별로 구분됨
 * => 인스턴스 형식이라 useProducts 사용시 자동으로 초기화가 진행되서
 */

export const useProducts = (initialProducts: Product[]) => {
  //
  // useState 가 내부적으로 불변성 유지중
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
