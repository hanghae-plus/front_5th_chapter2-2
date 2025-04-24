import { CartItem, Coupon } from "../../types";

/**
 * 장바구니에서 상품을 제거하는 순수 함수
 */
export const removeCartItem = (
  cart: CartItem[],
  productId: string
): CartItem[] => cart.filter((item) => item.product.id !== productId);

/**
 * 장바구니 상품을 업데이트하는 순수 함수
 */
export const updateCartItem = (
  cart: CartItem[],
  productId: string,
  updateFn: (item: CartItem) => CartItem
): CartItem[] =>
  cart.map((item) => (item.product.id === productId ? updateFn(item) : item));

/**
 * 상품의 총 금액을 계산하는 순수 함수
 */
export const calculateItemTotalPrice = (item: CartItem): number =>
  item.product.price * item.quantity;

/**
 * 적용 가능한 최대 할인율을 반환하는 순수 함수
 */
export const getMaxApplicableDiscount = (item: CartItem): number => {
  return item.product.discounts
    .filter(({ quantity }) => quantity <= item.quantity)
    .reduce((max, discount) => Math.max(max, discount.rate), 0);
};

/**
 * 상품별 할인 적용 후 금액을 계산하는 순수 함수
 */
export const calculateItemTotal = (item: CartItem): number => {
  const totalPrice = calculateItemTotalPrice(item);
  const maxApplicableDiscount = getMaxApplicableDiscount(item);

  return totalPrice - totalPrice * maxApplicableDiscount;
};

/**
 * 쿠폰 할인을 적용하는 순수 함수
 */
export const applyCouponDiscount = (
  totalAmount: number,
  selectedCoupon: Coupon | null
): number => {
  if (!selectedCoupon) {
    return totalAmount;
  }

  if (selectedCoupon.discountType === "amount") {
    return Math.max(0, totalAmount - selectedCoupon.discountValue);
  }

  return totalAmount * (1 - selectedCoupon.discountValue / 100);
};

/**
 * 장바구니 총액을 계산하는 순수 함수
 * 상품 할인과 쿠폰 할인을 모두 적용
 */
export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null
): {
  totalBeforeDiscount: number;
  totalBeforeApplyCoupon: number;
  totalAfterDiscount: number;
  totalDiscount: number;
} => {
  // 할인 전 총액
  const totalBeforeDiscount = cart.reduce(
    (total, item) => total + calculateItemTotalPrice(item),
    0
  );

  // 상품 할인 적용 후, 쿠폰 적용 전 금액
  const totalBeforeApplyCoupon = cart.reduce(
    (total, item) => total + calculateItemTotal(item),
    0
  );

  // 쿠폰 할인까지 모두 적용한 최종 금액
  const totalAfterDiscount = applyCouponDiscount(
    totalBeforeApplyCoupon,
    selectedCoupon
  );

  // 모든 할인 금액의 합
  const totalDiscount = totalBeforeDiscount - totalAfterDiscount;

  return {
    totalBeforeDiscount,
    totalBeforeApplyCoupon,
    totalAfterDiscount,
    totalDiscount,
  };
};

/**
 * 장바구니 상품의 수량을 업데이트하는 순수 함수
 * 수량이 0이면 상품 제거
 * 수량이 재고보다 많으면 재고 한도로 제한
 */
export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number
): CartItem[] => {
  if (newQuantity === 0) {
    return removeCartItem(cart, productId);
  }

  return updateCartItem(cart, productId, (item) => {
    const safeQuantity = Math.min(newQuantity, item.product.stock);

    return { ...item, quantity: safeQuantity };
  });
};
