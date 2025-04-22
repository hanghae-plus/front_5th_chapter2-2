import { CartItem, Coupon } from "../../types";

export const calculateItemTotal = (item: CartItem) => {
  const discountRate = getMaxApplicableDiscount(item);
  const priceWithDiscount = item.product.price * (1 - discountRate);
  return Math.floor(priceWithDiscount * item.quantity); // 소수점 버림 처리
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  const { quantity, product } = item;
  const applicable = product.discounts.filter(d => quantity >= d.quantity);
  if (applicable.length === 0) return 0;
  return Math.max(...applicable.map(d => d.rate));
};

export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null
) => {
  const totalBeforeDiscount = cart.reduce(
    (acc, item) => acc + calculateItemTotal(item),
    0
  );

  let totalDiscount = 0;

  if (selectedCoupon) {
    if (selectedCoupon.discountType === "amount") {
      // 금액 쿠폰의 경우, 할인 금액을 coupon.discountValue로 설정
      totalDiscount = selectedCoupon.discountValue;
    } else if (selectedCoupon.discountType === "percentage") {
      // 퍼센트 쿠폰의 경우, 총액에서 해당 비율을 할인
      totalDiscount = totalBeforeDiscount * (selectedCoupon.discountValue / 100);
    }

    // 할인액이 총액을 초과하지 않도록 보정
    totalDiscount = Math.min(totalDiscount, totalBeforeDiscount);
  }

  // 할인된 총액 계산
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
  newQuantity: number
): CartItem[] => {
  return cart
    .map((item) => {
      if (item.product.id === productId) {
        const maxQty = item.product.stock;
        const qty = Math.min(newQuantity, maxQty);
        return qty > 0
          ? { ...item, quantity: qty }
          : null; // 수량이 0이면 제거
      }
      return item;
    })
    .filter((item): item is CartItem => item !== null); // null 제거
};