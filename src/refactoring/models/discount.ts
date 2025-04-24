// 최대 할인율 계산하기
export const getMaxDiscount = (
  discounts: { quantity: number; rate: number }[],
) => discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
