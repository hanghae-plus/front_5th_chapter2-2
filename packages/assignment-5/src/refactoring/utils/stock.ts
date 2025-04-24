import { CartItem, Product } from '../types';

/**
 * 특정 상품의 남은 재고 수량을 계산합니다.
 */
export const getRemainingStock = (
  cart: CartItem[],
  product: Product
): number => {
  const cartItem = cart.find(item => item.product.id === product.id);
  return product.stock - (cartItem?.quantity || 0);
};
