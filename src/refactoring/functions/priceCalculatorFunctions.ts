import { CartItem, Coupon } from "../../types";

/**
 * 할인 계산 결과 인터페이스
 */
export interface DiscountCalculation {
  totalBeforeDiscount: number;
  totalAfterDiscount: number;
  totalDiscount: number;
}

/**
 * 단일 상품의 할인율을 계산
 * @param item 장바구니 항목
 * @returns 적용된 할인율
 */
export const calculateItemDiscountRate = (item: CartItem): number => {
  const applicableDiscounts = item.product.discounts.filter(
    discount => discount.quantity <= item.quantity
  );
  
  if (applicableDiscounts.length === 0) {
    return 0;
  }
  
  // 가장 높은 할인율 적용
  return Math.max(...applicableDiscounts.map(d => d.rate));
};

/**
 * 단일 상품의 총 가격 계산 (할인 전)
 * @param item 장바구니 항목
 * @returns 할인 전 총 가격
 */
export const calculateItemTotal = (item: CartItem): number => {
  return item.product.price * item.quantity;
};

/**
 * 단일 상품의 할인 금액 계산
 * @param item 장바구니 항목
 * @returns 할인 금액
 */
export const calculateItemDiscount = (item: CartItem): number => {
  const total = calculateItemTotal(item);
  const discountRate = calculateItemDiscountRate(item);
  return total * discountRate;
};

/**
 * 쿠폰 할인 금액 계산
 * @param subtotal 할인 적용 전 금액
 * @param coupon 적용할 쿠폰
 * @returns 쿠폰 할인 금액
 */
export const calculateCouponDiscount = (subtotal: number, coupon: Coupon | null): number => {
  if (!coupon) return 0;
  
  if (coupon.discountType === 'percentage') {
    return subtotal * (coupon.discountValue / 100);
  } else {
    return Math.min(coupon.discountValue, subtotal);
  }
};

/**
 * 장바구니의 총 금액과 할인을 계산하는 함수
 * @param cart 장바구니 항목 배열
 * @param selectedCoupon 선택된 쿠폰
 * @returns 할인 계산 결과
 */
export function calculateDiscount(
  cart: CartItem[],
  selectedCoupon: Coupon | null
): DiscountCalculation {
  let totalBeforeDiscount = 0;
  let totalItemDiscount = 0;
  
  // 각 상품별 금액 계산
  cart.forEach(item => {
    const itemTotal = calculateItemTotal(item);
    totalBeforeDiscount += itemTotal;
    
    const itemDiscount = calculateItemDiscount(item);
    totalItemDiscount += itemDiscount;
  });
  
  const subtotalAfterItemDiscount = totalBeforeDiscount - totalItemDiscount;
  
  // 쿠폰 할인 계산
  const couponDiscount = calculateCouponDiscount(subtotalAfterItemDiscount, selectedCoupon);
  
  const totalDiscount = totalItemDiscount + couponDiscount;
  const totalAfterDiscount = totalBeforeDiscount - totalDiscount;
  
  return {
    totalBeforeDiscount,
    totalAfterDiscount,
    totalDiscount
  };
} 