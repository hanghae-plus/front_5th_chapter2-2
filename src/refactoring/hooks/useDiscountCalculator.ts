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
  let totalDiscount = 0;
  
  // 각 상품별 금액 계산
  cart.forEach(item => {
    const itemTotal = item.product.price * item.quantity;
    totalBeforeDiscount += itemTotal;
    
    // 수량 기반 할인 찾기
    const applicableDiscounts = item.product.discounts.filter(
      discount => discount.quantity <= item.quantity
    );
    
    if (applicableDiscounts.length > 0) {
      // 가장 높은 할인율 적용
      const maxDiscount = Math.max(...applicableDiscounts.map(d => d.rate));
      const itemDiscount = itemTotal * maxDiscount;
      totalDiscount += itemDiscount;
    }
  });
  
  // 쿠폰 할인 계산
  let couponDiscount = 0;
  if (selectedCoupon) {
    if (selectedCoupon.discountType === 'percentage') {
      couponDiscount = (totalBeforeDiscount - totalDiscount) * (selectedCoupon.discountValue / 100);
    } else {
      couponDiscount = Math.min(selectedCoupon.discountValue, totalBeforeDiscount - totalDiscount);
    }
    totalDiscount += couponDiscount;
  }
  
  const totalAfterDiscount = totalBeforeDiscount - totalDiscount;
  
  return {
    totalBeforeDiscount,
    totalAfterDiscount,
    totalDiscount
  };
}
