import { CartItem, Discount } from '../../types.ts';

export const getMaxApplicableDiscount = (item: CartItem): number => {
  return item.product.discounts.reduce((maxDiscount, d) => {
    return item.quantity >= d.quantity && d.rate > maxDiscount
      ? d.rate
      : maxDiscount;
  }, 0);
};

export const calculateItemDiscountTotal = (
  total: number,
  item: CartItem,
): number => {
  if (item.product.discounts.length === 0) return total;
  const discount = getMaxApplicableDiscount(item);
  return total * (1 - discount);
};

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
