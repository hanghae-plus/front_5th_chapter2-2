import { CartItem, Coupon } from "../../types";

export const calculateItemTotal = (item: CartItem) => {
  const discountRate = getMaxApplicableDiscount(item);
  const itemTotal = item.quantity * item.product.price * (1 - discountRate);

  return itemTotal;
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  // 아이템 수량 기준을 충족하는 할인 항목들. 그 중 할인율만 추출
  const applicableDiscountRates = item.product.discounts
    .filter((discount) => item.quantity >= discount.quantity)
    .map((discount) => discount.rate);

  // 적용가능한 할인율 중 최댓값. 빈 배열을 고려해 0과 비교
  const maxDiscountRate = Math.max(...applicableDiscountRates, 0);

  return maxDiscountRate;
};

export const getCouponAppliedTotal = (amount: number, coupon: Coupon) => {
  switch (coupon.discountType) {
    case "amount":
      return Math.max(0, amount - coupon.discountValue);
    case "percentage":
      return amount * (1 - coupon.discountValue / 100);
  }
};

export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null
) => {
  const totalBeforeDiscount = cart.reduce(
    (prevTotal, currCart) =>
      prevTotal + currCart.quantity * currCart.product.price,
    0
  );

  const totalAfterItemDiscount = cart.reduce(
    (prevTotal, currCart) => prevTotal + calculateItemTotal(currCart),
    0
  );

  const totalAfterDiscount = selectedCoupon
    ? getCouponAppliedTotal(totalAfterItemDiscount, selectedCoupon)
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
  return cart.map((item) =>
    item.product.id === productId ? { ...item, quantity: newQuantity } : item
  );
};
