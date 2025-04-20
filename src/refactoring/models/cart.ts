import { CartItem, Coupon } from "../../types";

export const calculateItemTotal = (item: CartItem) => {
  const { product, quantity } = item;
  const { price } = product;
  const discount = getMaxApplicableDiscount(item);

  return price * quantity * (1 - discount);
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  const { product, quantity } = item;
  const { discounts } = product;

  return discounts.reduce((max, discount) => {
    if (discount.quantity <= quantity) {
      return Math.max(max, discount.rate);
    }
    return max;
  }, 0);
};

export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null,
) => {
  const totalBeforeDiscount = cart.reduce((total, item) => {
    const { price } = item.product;
    const { quantity } = item;
    return total + price * quantity;
  }, 0);
  const totalAfterDiscount = applyCoupon(
    cart.reduce((total, item) => total + calculateItemTotal(item), 0),
    selectedCoupon,
  );
  const totalDiscount = totalBeforeDiscount - totalAfterDiscount;
  return {
    totalBeforeDiscount,
    totalAfterDiscount,
    totalDiscount,
  };
};
const applyCoupon = (price: number, coupon: Coupon | null) => {
  if (coupon?.discountType === "amount") {
    return price - coupon.discountValue;
  } else if (coupon?.discountType === "percentage") {
    return price * (1 - coupon.discountValue / 100);
  }
  return price;
};

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number,
): CartItem[] => {
  if (newQuantity <= 0) {
    return cart.filter((item) => item.product.id !== productId);
  }

  const updatedCart = cart.map((item) => {
    if (newQuantity > item.product.stock) {
      return { ...item, quantity: item.product.stock };
    }
    if (item.product.id === productId) {
      return { ...item, quantity: newQuantity };
    }
    return item;
  });
  return updatedCart;
};
