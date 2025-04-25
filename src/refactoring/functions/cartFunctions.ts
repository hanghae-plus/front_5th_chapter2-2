import { CartItem, Product } from '../../types';

/**
 * 상품의 최대 할인율을 계산
 * @param discounts 할인 정보 배열
 * @returns 최대 할인율
 */
export const getMaxDiscount = (discounts: { quantity: number; rate: number }[]): number => {
  return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
};

/**
 * 상품의 남은 재고 계산
 * @param product 상품 정보
 * @param cart 장바구니 항목 배열
 * @returns 남은 재고 수량
 */
export const getRemainingStock = (product: Product, cart: CartItem[]): number => {
  const cartItem = cart.find(item => item.product.id === product.id);
  return product.stock - (cartItem?.quantity || 0);
};

/**
 * 장바구니 항목에 적용된 할인율 계산
 * @param item 장바구니 항목
 * @returns 적용된 할인율
 */
export const getAppliedDiscount = (item: CartItem): number => {
  const { discounts } = item.product;
  const { quantity } = item;
  return discounts.reduce((maxDiscount, discount) => {
    if (quantity >= discount.quantity) {
      return Math.max(maxDiscount, discount.rate);
    }
    return maxDiscount;
  }, 0);
}; 