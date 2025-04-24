import { Product } from '../../types';

// ID 생성, 상품 객체 생성 (순수 함수 )
const createProductWithId = (product: Omit<Product, 'id'>): Product => {
  return {
    ...product,
    id: Date.now().toString(),
  };
};

const updateProductProperty = <K extends keyof Product>(
  product: Product,
  property: K,
  value: Product[K]
): Product => {
  return {
    ...product,
    [property]: value,
  };
};

export { createProductWithId, updateProductProperty };
