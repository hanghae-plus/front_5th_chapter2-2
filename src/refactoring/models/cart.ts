import { CartItem, Coupon } from "../../types";

export const calculateItemTotal = (item: CartItem) => {
  const basePrice = item.product.price * item.quantity;
  return basePrice;
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  const applicableDiscounts = item.product.discounts.filter(
    (discount) => item.quantity >= discount.quantity,
  );
  return applicableDiscounts;
};

export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null,
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
  newQuantity: number,
): CartItem[] => {
  return [];
};
