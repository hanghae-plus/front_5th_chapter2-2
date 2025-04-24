/**
 * 쿠폰(Coupon)에 대한 타입 정의
 */

export interface Coupon {
  /**
   * 쿠폰 이름 (예: 10% 할인 쿠폰)
   */
  name: string;

  /**
   * 쿠폰 코드 (고유 식별용 코드)
   */
  code: string;

  /**
   * 할인 유형 ('amount' = 금액, 'percentage' = 퍼센트)
   */
  discountType: 'amount' | 'percentage';

  /**
   * 할인 값 (ex: 5000원 or 10%)
   */
  discountValue: number;
}