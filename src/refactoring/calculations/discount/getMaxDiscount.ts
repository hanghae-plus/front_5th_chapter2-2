import { Discount } from "../../entities";

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
