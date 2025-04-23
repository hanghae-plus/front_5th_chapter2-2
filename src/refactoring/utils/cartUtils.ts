import { CartItem, Product } from './../../types';

// 최대 할인율 계산하기
export const getMaxDiscount = (
  discounts: { quantity: number; rate: number }[],
) => discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);

// 재고 계산하기
export const getRemainingStock = (product: Product, cart: CartItem[]) => {
  const cartItem = cart.find((item) => item.product.id === product.id);
  return product.stock - (cartItem?.quantity || 0);
};

// 장바구니 상품의 최대 할인율을 계산하기
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
