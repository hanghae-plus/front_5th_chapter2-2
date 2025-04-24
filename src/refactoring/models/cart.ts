// cart.ts
import { CartItem, Coupon } from "../../types";

export const getMaxApplicableDiscount = (item: CartItem): number => {
  const { quantity, product } = item;
  const applicable = product.discounts
    .filter((d) => quantity >= d.quantity)
    .map((d) => d.rate);
  return applicable.length > 0 ? Math.max(...applicable) : 0;
};

export const calculateItemTotal = (item: CartItem): number => {
  const discountRate = getMaxApplicableDiscount(item);
  return Math.floor(item.product.price * item.quantity * (1 - discountRate));
};

export const calculateCartTotal = (cart: CartItem[], coupon: Coupon | null) => {
  const totalBeforeDiscount = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );
  const itemDiscount = cart.reduce(
    (acc, item) =>
      acc +
      item.product.price * item.quantity -
      calculateItemTotal(item),
    0,
  );
  let couponDiscount = 0;
  const subtotal = totalBeforeDiscount - itemDiscount;

  if (coupon) {
    if (coupon.discountType === "amount") {
      couponDiscount = coupon.discountValue;
    } else if (coupon.discountType === "percentage") {
      couponDiscount = Math.floor((subtotal * coupon.discountValue) / 100);
    }
  }

  const totalDiscount = itemDiscount + couponDiscount;
  const totalAfterDiscount = totalBeforeDiscount - totalDiscount;

  return {
    totalBeforeDiscount,
    totalAfterDiscount,
    totalDiscount,
  };
};

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  quantity: number,
): CartItem[] => {
  if (quantity <= 0) return cart.filter((item) => item.product.id !== productId);

  return cart.map((item) => {
    if (item.product.id !== productId) return item;
    const newQuantity = Math.min(quantity, item.product.stock);
    return { ...item, quantity: newQuantity };
  });
};
