import { CartItem, Coupon, Discount, Product } from "../../types";

export const getMaxDiscountRate = (
  discounts: Discount[],
  quantity: number
): number => {
  return discounts.reduce((maxRate, discount) => {
    if (quantity >= discount.quantity) {
      return Math.max(maxRate, discount.rate);
    }
    return maxRate;
  }, 0);
};

export const getMaxDiscountDisplay = (product: Product) =>
  product.discounts.length > 0
    ? `최대 ${(getMaxDiscountRate(product.discounts, 1) * 100).toFixed(
        0
      )}% 할인`
    : null;

export const getMaxApplicableDiscount = (item: CartItem) => {
  const { product, quantity } = item;
  return getMaxDiscountRate(product.discounts, quantity);
};

export const applyCouponDiscount = (
  amount: number,
  coupon: Coupon | null
): number => {
  if (!coupon) return amount;

  if (coupon.discountType === "amount") {
    return Math.max(0, amount - coupon.discountValue);
  }

  return amount * (1 - coupon.discountValue / 100);
};

export const formatCouponDisplay = (coupon: Coupon) => {
  return coupon.discountType === "amount"
    ? `${coupon.discountValue}원`
    : `${coupon.discountValue}%`;
};

export const calculateItemTotal = (item: CartItem) => {
  const { product, quantity } = item;
  const baseTotal = product.price * quantity;
  const maxDiscountRate = getMaxDiscountRate(product.discounts, quantity);
  return Math.round(baseTotal * (1 - maxDiscountRate));
};

export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null
) => {
  const totalBeforeDiscount = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const totalAfterItemDiscounts = cart.reduce(
    (total, item) => total + calculateItemTotal(item),
    0
  );

  const totalAfterCoupon = applyCouponDiscount(
    totalAfterItemDiscounts,
    selectedCoupon
  );

  return {
    totalBeforeDiscount: Math.round(totalBeforeDiscount),
    totalAfterDiscount: Math.round(totalAfterCoupon),
    totalDiscount: Math.round(totalBeforeDiscount - totalAfterCoupon),
  };
};

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number
): CartItem[] => {
  return cart
    .map((item) => {
      if (item.product.id !== productId) return item;
      if (newQuantity <= 0) return null;
      const updatedQuantity = Math.min(newQuantity, item.product.stock);
      return { ...item, quantity: updatedQuantity };
    })
    .filter((item): item is CartItem => item !== null);
};

export const getRemainingStock = (product: Product, cart: CartItem[]) => {
  const cartItem = cart.find((item) => item.product.id === product.id);
  return product.stock - (cartItem?.quantity || 0);
};
