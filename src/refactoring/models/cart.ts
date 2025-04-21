import { CartItem, Coupon } from "../../types";
// import { calculateCartTotal, updateCartItemQuantity } from "../models/cart";

/**
 *1. 할인 없이 총액을 계산해야 한다.
 *2. 수량에 따라 올바른 할인을 적용해야한다.
 */
export const calculateItemTotal = (item: CartItem) => {
  return 0;
};

/**
 *1. 할인이 적용되지 않으면 0을 반환해야 한다ㅣ.
 *2. 적용 가능한 가장 높은 할인율을 반환해야한다.
 */
export const getMaxApplicableDiscount = (item: CartItem) => {
  return 0;
};

/**
 *1. 쿠폰 없이 총액을 올바르게 계산해야한다.
 *2. 금액쿠폰을 올바르게 적용해야 한다.
 *3. 퍼센트 쿠폰을 올바르게 적용해야 한다.
 */
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

/**
 *1. 수량을 올바르게 업데이트해야합니다.
 *2. 수량이 0으로 설정된 경우, 항목을 제거해야 한다.
 *3. 재고 한도를 초과해서는 안된다.
 */
export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number,
): CartItem[] => {
  return [];
};
