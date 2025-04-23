import { CartItem, Discount } from '../../types.ts';

export const getAppliedDiscount = (item: CartItem) => {
  const { discounts } = item.product;
  const { quantity } = item;

  if (!discounts || discounts.length === 0) return 0;

  const appliedDiscount = discounts
    .filter((discount) => quantity >= discount.quantity)
    .reduce((max, discount) => Math.max(max, discount.rate), 0);
  return appliedDiscount;
};

export const getMaxDiscount = (discounts: Discount[]) => {
  return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
};
