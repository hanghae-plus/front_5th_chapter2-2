import { Coupon } from '../../types';

/**
 * 쿠폰 할인 정보를 포맷팅하는 함수
 * @param coupon 쿠폰 객체
 * @returns 포맷팅된 할인 정보 문자열
 */
export const formatCouponDiscount = (coupon: Coupon): string => {
  if (coupon.discountType === 'amount') {
    return `${coupon.discountValue}원`;
  } else { // 'percentage'
    return `${coupon.discountValue}%`;
  }
}; 