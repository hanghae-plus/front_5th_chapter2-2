import { CartItem, Coupon } from "../../types";

export const calculateItemTotal = (item: CartItem) => {
  const { product, quantity } = item;
  const { price } = product;
  const total = price * quantity;
  const maxDiscount = getMaxApplicableDiscount(item);
  const discount = total * maxDiscount;
  return total - discount;
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  const { product, quantity } = item;
  const { discounts } = product;
  const maxDiscount = discounts.reduce((acc, discount) => {
    if (quantity >= discount.quantity) return discount.rate;
    return acc;
  }, 0);
  return maxDiscount;
};

export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null
) => {
  return {
    totalBeforeDiscount: 0,
    totalAfterDiscount: 0,
    totalDiscount: 0,
  };
};

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number
): CartItem[] => {
  return [];
};
