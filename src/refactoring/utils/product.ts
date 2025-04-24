import { CartItem, Product } from '../types';

// 제품 재고에서 장바구니 수량을 뺀 남은 재고를 계산하는 함수
export const getRemainingStock = (product: Product, cart: CartItem[]) => {
  const cartItem = cart.find(item => item.product.id === product.id);
  return product.stock - (cartItem?.quantity || 0);
};

// 제품에 설정된 모든 할인 중 최댓값을 계산하는 함수
export const getMaxDiscount = (
  discounts: { quantity: number; rate: number }[]
) => {
  return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
};
