import { CartItem, Coupon, Discount } from "../../types";
// 적용 가능한 최대 할인율 찾기
const maxDiscount = (discounts: Discount[], quantity: number) =>
  discounts.reduce((maxRate, discount) => {
    // 현재 수량이 할인 적용 수량 이상인 경우에만 할인율 비교
    return quantity >= discount.quantity && discount.rate > maxRate
      ? discount.rate
      : maxRate;
  }, 0);

export const calculateItemTotal = (item: CartItem) => {
  if (!item) return 0;

  const { product, quantity } = item;
  const { price, discounts } = product;

  // 기본 금액 계산
  const baseTotal = price * quantity;

  // 적용 가능한 최대 할인율 찾기
  const discountRate = maxDiscount(discounts, quantity);

  // 할인된 금액 반환
  return baseTotal * (1 - discountRate);
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  if (!item) return 0;

  const { product, quantity } = item;
  const { discounts } = product;

  const discountRate = maxDiscount(discounts, quantity);

  return discountRate;
};

export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null
) => {
  // 1. 기본 금액 계산
  let totalBeforeDiscount = 0;
  let totalAfterDiscount = 0;

  // 각 상품별 금액 계산
  cart.forEach(item => {
    const itemTotal = item.product.price * item.quantity;
    totalBeforeDiscount += itemTotal;

    const discountedTotal = calculateItemTotal(item);
    totalAfterDiscount += discountedTotal;

  });

  // 2. 쿠폰 할인 적용
  let finalAfterDiscount = totalAfterDiscount;
  
  if (selectedCoupon) {
    if (selectedCoupon.discountType === 'amount') {
      // 금액 할인
      finalAfterDiscount = Math.max(0, totalAfterDiscount - selectedCoupon.discountValue);
    } else {
      // 퍼센트 할인
      finalAfterDiscount = totalAfterDiscount * (1 - selectedCoupon.discountValue / 100);
    }
  }
  const totalDiscount = totalBeforeDiscount - finalAfterDiscount;

  return {
    totalBeforeDiscount: Math.round(totalBeforeDiscount),
    totalAfterDiscount: Math.round(finalAfterDiscount),
    totalDiscount: Math.round(totalDiscount)
  };
};

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number
): CartItem[] => {
  // 수량이 0 이하인 경우 해당 상품 제거
  if (newQuantity <= 0) {
    return cart.filter(item => item.product.id !== productId);
  }

  return cart.map(item => {
    // 해당 상품이 아니면 그대로 반환
    if (item.product.id !== productId) {
      return item;
    }

    // 재고 한도 체크
    const maxQuantity = item.product.stock;
    // 새로운 수량은 재고를 초과할 수 없음
    const updatedQuantity = Math.min(newQuantity, maxQuantity);


    return {
      ...item,
      quantity: updatedQuantity
    };
  });
};

  //계산
  export const getAppliedDiscount = (item: CartItem) => {
    const { discounts } = item.product;
    const { quantity } = item;
    let appliedDiscount = 0;
    for (const discount of discounts) {
      if (quantity >= discount.quantity) {
        appliedDiscount = Math.max(appliedDiscount, discount.rate);
      }
    }
    return appliedDiscount;
  };
