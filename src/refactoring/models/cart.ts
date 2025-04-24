import { CartItem, Coupon } from "../../types";

export const findCartItem = (cart: CartItem[], productId: string) =>
  cart.find((item) => item.product.id === productId);

export const removeCartItem = (cart: CartItem[], productId: string) =>
  cart.filter((item) => item.product.id !== productId);

const updateCartItem = (
  cart: CartItem[],
  productId: string,
  updateFn: (item: CartItem) => CartItem,
) =>
  cart.map((item) => (item.product.id === productId ? updateFn(item) : item));

const calculateItemTotalPrice = (item: CartItem) =>
  item.product.price * item.quantity;

export const getMaxApplicableDiscount = (item: CartItem) => {
  return item.product.discounts
    .filter(({ quantity }) => quantity <= item.quantity)
    .reduce((max, discount) => Math.max(max, discount.rate), 0);
};

export const calculateItemTotal = (item: CartItem) => {
  const totalPrice = calculateItemTotalPrice(item);
  const maxApplicableDiscount = getMaxApplicableDiscount(item);

  return totalPrice - totalPrice * maxApplicableDiscount;
};

const applyCouponDiscount = (
  totalAmount: number,
  selectedCoupon: Coupon | null,
) => {
  if (!selectedCoupon) {
    return totalAmount;
  }

  if (selectedCoupon.discountType === "amount") {
    return Math.max(0, totalAmount - selectedCoupon.discountValue);
  }

  return totalAmount * (1 - selectedCoupon.discountValue / 100);
};

export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null,
) => {
  const totalBeforeDiscount = cart.reduce(
    (total, item) => total + calculateItemTotalPrice(item),
    0,
  );
  const totalBeforeApplyCoupon = cart.reduce(
    (total, item) => total + calculateItemTotal(item),
    0,
  );

  const totalAfterDiscount = applyCouponDiscount(
    totalBeforeApplyCoupon,
    selectedCoupon,
  );

  return {
    totalBeforeDiscount,
    totalAfterDiscount,
    totalDiscount: totalBeforeDiscount - totalAfterDiscount,
  };
};

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number,
): CartItem[] => {
  if (newQuantity === 0) {
    return removeCartItem(cart, productId);
  }

  return updateCartItem(cart, productId, (item) => {
    const safeQuantity = Math.min(newQuantity, item.product.stock);

    return { ...item, quantity: safeQuantity };
  });
};
