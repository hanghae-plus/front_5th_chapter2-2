import { formatDiscountRate, formatCurrency } from '@/features/cart/utils';
import { getAppliedDiscount } from '../models/cart';
import { CartItem } from '@/types';

export const useCartItem = (item: CartItem) => {
  const appliedDiscount = getAppliedDiscount(item);
  const formattedPrice = formatCurrency(item.product.price);
  const formattedDiscount = formatDiscountRate(appliedDiscount);
  const hasDiscount = appliedDiscount > 0;

  return {
    appliedDiscount,
    formattedPrice,
    formattedDiscount,
    hasDiscount,
    quantity: item.quantity,
    productId: item.product.id,
    productName: item.product.name,
  };
};
