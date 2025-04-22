import { CartItem, Discount } from "../../entities";

/**
 * 주어진 할인 조건 배열에서 가장 높은 할인율(rate)을 계산하는 순수함수
 *
 * @param {Array<{ quantity: number; rate: number }>} discounts - 할인 조건 목록
 * @returns {number} - 가장 높은 할인율 (0 ~ 1 사이의 값)
 *
 */

export const getMaxDiscount = (discounts: Discount[]): number => {
  return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
};

/**
 * 장바구니 아이템의 수량에 따라 적용 가능한 최대 할인율을 계산하는 순수 함수
 *
 * @param {CartItem} item - 장바구니 항목
 * @returns {number} - 적용된 할인율
 */

export const getAppliedDiscount = (item: CartItem) => {
  const { discounts } = item.product;
  const { quantity } = item;

  const appliedDiscount = discounts
    .filter((discount) => quantity >= discount.quantity)
    .reduce((max, discount) => Math.max(max, discount.rate), 0);

  return appliedDiscount;
};
