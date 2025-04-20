import { CartItem, Coupon } from "../../types";

export const calculateItemTotal = (item: CartItem) => {
  return 0;
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  return 0;
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
  if (newQuantity === 0) {
    return cart.filter((item) => item.product.id !== productId);
  }

  const computedCart = cart.map((item) => {
    if (item.product.id === productId) {
      return {
        product: { ...item.product, stock: item.product.stock - 1 },
        quantity: newQuantity,
      };
    }
    return item;
  });

  return computedCart;
};
