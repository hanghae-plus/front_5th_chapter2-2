import { CartItem, Coupon } from "../../types";


/**
 * 항목의 총 금액을 계산
 * @param item 항목
 * @returns 항목의 총 금액
 */
export const calculateItemTotal = (item: CartItem) => {
  const maxDiscount = getMaxApplicableDiscount(item);
  return item.product.price * item.quantity * (1 - maxDiscount);
};

/**
 * 적용 가능한 최대 할인을 계산
 * @param item 항목
 * @returns 적용 가능한 최대 할인
 */
export const getMaxApplicableDiscount = (item: CartItem) => {
  return item.product.discounts.reduce((max, discount) => {
    if (discount.quantity <= item.quantity) {
      return Math.max(max, discount.rate);
    }
    return max;
  }, 0);
};

/**
 * 장바구니의 총 금액을 계산
 * @param cart 장바구니
 * @param selectedCoupon 선택된 쿠폰
 * @returns totalBeforeDiscount 총 금액, totalAfterDiscount 할인 금액, totalDiscount 총 할인 금액
 */
export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null
): {totalBeforeDiscount: number, totalAfterDiscount: number, totalDiscount: number} => {
  let totalBeforeDiscount = 0;
  let totalAfterDiscount = 0;
  let totalDiscount = 0;

  // 총 금액 계산
  cart.forEach(item => {
    const { price } = item.product;
    const { quantity } = item;
    const maxDiscount = getMaxApplicableDiscount(item);
    const itemTotal = price * quantity;
    const itemDiscount = itemTotal * maxDiscount;

    totalBeforeDiscount += itemTotal;
    totalDiscount += itemDiscount;
  });

  // 할인 금액 계산
  totalAfterDiscount = totalBeforeDiscount - totalDiscount;

  // 쿠폰 적용
  if (selectedCoupon) {
    if (selectedCoupon.discountType === 'amount') {
      totalDiscount += selectedCoupon.discountValue;
    } else {
      const couponDiscount = totalAfterDiscount * (selectedCoupon.discountValue / 100);
      totalDiscount += couponDiscount;
    }
    totalAfterDiscount = totalBeforeDiscount - totalDiscount;
  }

  return {
    totalBeforeDiscount,
    totalAfterDiscount,
    totalDiscount,
  };
};

/**
 * 장바구니 항목의 수량을 업데이트
 * @param cart 장바구니
 * @param productId 수량을 업데이트할 제품의 ID
 * @param newQuantity 새로운 수량
 * @returns 업데이트된 장바구니
 */
export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number
): CartItem[] => {

  // 수량이 0이면 제거
  if (newQuantity === 0) return cart.filter(item => item.product.id !== productId);
  

  // 수량 업데이트
  return cart.map(item => {
    if (item.product.id === productId) {
      return { ...item, quantity: Math.min(newQuantity, item.product.stock) };
    }
    return item;
  });
};
