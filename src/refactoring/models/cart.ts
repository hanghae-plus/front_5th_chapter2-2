import { CartItem, Coupon } from "../../types";

export const calculateItemTotal = (item: CartItem) => {
  const totalPrice = item.product.price * item.quantity;
  const discountRate = getMaxApplicableDiscount(item);

  return totalPrice * (1 - discountRate);
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  const applicableRates = item.product.discounts
    .filter((rule) => item.quantity >= rule.quantity)
    .map((rule) => rule.rate);

  const maxDiscountRate = Math.max(0, ...applicableRates);

  return maxDiscountRate;
};

export const applyCouponDiscount = (
  totalAmount: number,
  selectedCoupon: Coupon
) => {
  switch (selectedCoupon.discountType) {
    case "amount":
      return totalAmount - selectedCoupon.discountValue;
    case "percentage":
      return totalAmount * (1 - selectedCoupon.discountValue / 100);
    default:
      return totalAmount;
  }
};

export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null
) => {
  const totalBeforeDiscount = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  // 상품 수량별 할인 적용된 전체 값
  const totalAfterItemDiscount = cart.reduce(
    (total, item) => total + calculateItemTotal(item),
    0
  );

  const totalAfterDiscount = selectedCoupon
    ? applyCouponDiscount(totalAfterItemDiscount, selectedCoupon)
    : totalAfterItemDiscount;

  const totalDiscount = totalBeforeDiscount - totalAfterDiscount;

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
  if (newQuantity <= 0) {
    return cart.filter((item) => item.product.id !== productId);
  }

  return cart.map((item) => {
    if (item.product.id !== productId) {
      return item;
    }

    const quantity = Math.min(newQuantity, item.product.stock);

    return { ...item, quantity };
  });
};
