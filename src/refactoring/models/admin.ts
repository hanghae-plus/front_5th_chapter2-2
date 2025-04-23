import { Discount, Product } from '../../types';

//할인추가
export const addDiscount = (product: Product, discount: Discount): Product => {
  return { ...product, discounts: [...product.discounts, discount] };
};

//할인 삭제
export const removeDiscount = (product: Product, index: number): Product => {
  return { ...product, discounts: product.discounts.filter((_, i) => i !== index) };
};

//제품 이름 업데이트
export const updateProductName = (product: Product, newName: string) => {
  return { ...product, name: newName };
};

export const updateProductPrice = (product: Product, newPrice: number): Product => ({
  ...product,
  price: newPrice,
});

//재고 업데이트
export const updateProductStock = (product: Product, newStock: number) => {
  return { ...product, stock: newStock };
};
