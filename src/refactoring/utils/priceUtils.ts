import { CartItem } from '../../types';

export const calculateItemOriginalTotal = (item: CartItem): number => {
  const { price } = item.product;
  const { quantity } = item;
  return price * quantity;
};
