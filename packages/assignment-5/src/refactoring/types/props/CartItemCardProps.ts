/**
 * CartPage 컴포넌트에서 사용하는 Props 타입 정의
 */

import { Product } from '../product';
import { Coupon } from '../coupon';

/**
 * CartPage에 전달되는 props입니다.
 */
export interface CartPageProps {
  /**
   * 현재 등록된 전체 상품 목록
   */
  products: Product[];

  /**
   * 현재 사용 가능한 쿠폰 목록
   */
  coupons: Coupon[];
}