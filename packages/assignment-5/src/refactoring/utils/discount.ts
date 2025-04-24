import { CartItem, Product } from '../types';

/**
 * 장바구니 항목의 수량에 따라 적용 가능한 최대 할인율을 계산합니다.
 */
export const getAppliedDiscount = (item: CartItem) => {
  const { discounts } = item.product;
  const { quantity } = item;
  let appliedDiscount = 0;
  for (const discount of discounts) {
    if (quantity >= discount.quantity) {
      appliedDiscount = Math.max(appliedDiscount, discount.rate);
    }
  }
  return appliedDiscount;
};

/**
 * 상품에 대해 사용 가능한 최대 할인율을 계산합니다.
 */
export const getMaxDiscount = (discounts: { quantity: number; rate: number }[]) => {
  return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
};
