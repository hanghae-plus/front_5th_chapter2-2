import { Discount, Product } from "../../types.ts"

// 할인 추가
export const addDiscountToProduct = (product: Product, discount: Discount): Product => {
  return {
    ...product,
    discounts: [...product.discounts, discount],
  };
}

// 할인 유효성 검사
export const isValidDiscount = (discount: Discount): boolean => {
  return discount.quantity > 0 && discount.rate > 0;
}

// 할인 제거
export const removeDiscountFromProduct = (product: Product, index: number): Product => {
  return {
    ...product,
    discounts: product.discounts.filter((_, i) => i !== index),
  };
}