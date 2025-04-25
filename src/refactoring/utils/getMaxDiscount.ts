import { Discount } from '../models/product/types';

export const getMaxDiscount = (discounts: Discount[]) =>
  discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
