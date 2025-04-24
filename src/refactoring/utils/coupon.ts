import { formatCurrency } from './format';
import { DiscountType, DISCOUNT_TYPE } from '../types';

export const formatDiscountValue = (
  type: DiscountType,
  value: number
): string =>
  type === DISCOUNT_TYPE.AMOUNT ? `${formatCurrency(value)}원` : `${value}%`;
