import { CartItem, Coupon } from "../types";


export const calculateItemTotal = (item: CartItem):number => {
  const discountRate = getMaxApplicableDiscount(item); // 수량에 따라 할인율 계산
  const discountedPrice = item.product.price * (1 - discountRate); // 할인 적용된 단가
  return Math.round(discountedPrice * item.quantity); // 전체 가격 (반올림)
};

//적용 가능한 가장 높은 할인율을 반환해야 합니다.
export const getMaxApplicableDiscount = (item: CartItem) => {

  const {quantity,product} = item;
  
  //현재 수량보다 작거나 같은 조건 할인만 필터링
  const applicable = product.discounts
  .filter((d)=>quantity >= d.quantity)
  .map((d)=>d.rate);

  //적용 가능 할인 중 가장 큰 값 반환, 없으면 0
  return applicable.length ? Math.max(...applicable) : 0;
};

//할인 없이 총액을 계산해야 합니다.
//수량에 따라 올바른 할인을 적용해야 합니다.
export const calculateCartTotal = (
  cart: CartItem[],              // 장바구니에 담긴 상품들
  selectedCoupon: Coupon | null  // 선택된 쿠폰 (없을 수도 있음)
) => {

  // 1. 할인 전 총액 계산
  // 모든 상품의 개별 가격 * 수량을 더해서 계산
  const totalBeforeDiscount = cart.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);
  // 예: 10000원짜리 상품 2개 → 20000원

  // 2. 상품별 할인율 적용 후 총합 계산
  // 각 상품에 대해 수량 조건에 맞는 할인율을 계산해서 할인 적용
  const itemDiscountedTotal = cart.reduce((acc, item) => {
    return acc + calculateItemTotal(item);  // 할인 적용된 가격 * 수량
  }, 0);
  // 예: 10% 할인된 상품 2개 → (10000 * 0.9) * 2 = 18000원

  // 3. 선택된 쿠폰이 있다면 추가 할인 적용
  let finalTotal = itemDiscountedTotal;

  if (selectedCoupon) {
    // 쿠폰 타입에 따라 할인 적용
    if (selectedCoupon.discountType === 'percentage') {
      finalTotal *= (1 - selectedCoupon.discountValue / 100);
    } else {
      finalTotal -= selectedCoupon.discountValue;
    }
  }

  // 4. 결과 반환 (모두 반올림해서 소숫점 제거)
  return {
    totalBeforeDiscount,                            // 할인 전 총액
    totalAfterDiscount: Math.round(finalTotal),     // 최종 할인 적용 후 총액
    totalDiscount: Math.round(totalBeforeDiscount - finalTotal), // 전체 할인 금액
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
        const adjustedQuantity = Math.min(newQuantity, item.product.stock); // 재고 초과 방지
        return adjustedQuantity > 0 ? { ...item, quantity: adjustedQuantity } : null;
      }
      return item;
    })
    .filter((item): item is CartItem => item !== null); // 수량 0일 경우 제거
};