import { CartItem, Product } from '../../types';

export const getMaxDiscount = (discounts: { quantity: number; rate: number }[]) => {
  return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
};

export const getRemainingStock = (product: Product, cart: CartItem[]) => {
  const cartItem = cart.find(item => item.product.id === product.id);
  return product.stock - (cartItem?.quantity || 0);
};

export const getAppliedDiscount = (item: CartItem) => {
  const { discounts } = item.product;
  const { quantity } = item;
  return discounts.reduce((maxDiscount, discount) => {
    if (quantity >= discount.quantity) {
      return Math.max(maxDiscount, discount.rate);
    }
    return maxDiscount;
  }, 0);
}; 