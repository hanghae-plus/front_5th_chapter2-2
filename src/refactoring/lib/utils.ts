import { SelectOption, StringOption } from '../../types';

export const getMaxDiscount = (discounts: { quantity: number; rate: number }[]) => {
  return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
};

export const isStringOption = (option: SelectOption): option is StringOption =>
  typeof option === 'string';

export const isAmountDiscount = (discountType: string) => discountType === 'amount';
