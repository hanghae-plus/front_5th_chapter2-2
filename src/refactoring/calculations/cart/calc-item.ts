import { CartItem, Product } from "../../entities";

/**
 * 장바구니에 담긴 수량을 고려해, 남은 재고를 계산하는 순수 함수
 *
 * @param {Product} product - 상품 객체
 * @param {CartItem[]} cart - 현재 장바구니 목록
 * @returns {number} - 장바구니 반영 후 남은 재고 수량
 */
export const getRemainingStock = (product: Product, cart: CartItem[]): number => {
  const cartItem = cart.find((item) => item.product.id === product.id);
  return product.stock - (cartItem?.quantity || 0);
};

/**
 * 장바구니 항목의 총액을 계산합니다.
 * 적용 가능한 최대 할인율을 찾아 할인된 가격을 반환합니다.
 *
 * @param item - 장바구니 항목
 * @returns 할인 후 총 금액
 */
export const calculateItemTotal = (item: CartItem): number => {
  const { price, discounts } = item.product;
  const { quantity } = item;

  const maxDiscountRate = discounts
    .filter((d) => quantity >= d.quantity)
    .reduce((max, d) => Math.max(max, d.rate), 0);

  return price * quantity * (1 - maxDiscountRate);
};
