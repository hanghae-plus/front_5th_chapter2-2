import { CartItem, Coupon } from "../../types";

export const calculateItemTotal = (item: CartItem) => {
  return item.product.price * item.quantity * (1 - getMaxApplicableDiscount(item));
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  const applicableDiscounts = item.product.discounts.filter((discount) => discount.quantity <= item.quantity);
  return applicableDiscounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
};

export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null
) => {

  console.log(cart)
  console.log(selectedCoupon)
  const totalBeforeDiscount = cart.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  const totalAfterDiscount = cart.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  const totalDiscount = totalBeforeDiscount - totalAfterDiscount;

  console.log('utils',totalBeforeDiscount, totalAfterDiscount, totalDiscount);
  return {
    totalBeforeDiscount,
    totalAfterDiscount,
    totalDiscount,
  };
};

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number
): CartItem[] => {
  return [];
};
