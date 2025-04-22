import { CartItem } from "../../entities";

/** 할인 전 총액 계산 */
export const calculateTotalBeforeDiscount = (cart: CartItem[]): number => {
  return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
};

/** 할인 후 총액 계산 */
export const calculateTotalAfterDiscount = (cart: CartItem[]): number => {
  return cart.reduce((sum, item) => {
    const { price, discounts } = item.product;
    const { quantity } = item;

    const maxDiscount = discounts
      .filter((d) => quantity >= d.quantity)
      .reduce((max, d) => Math.max(max, d.rate), 0);

    return sum + price * quantity * (1 - maxDiscount);
  }, 0);
};
