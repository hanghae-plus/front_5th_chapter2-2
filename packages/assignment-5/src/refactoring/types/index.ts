
/**
 * 타입 내보내기 및 장바구니 항목 타입 정의
 */

// 개별 도메인 타입 내보내기기
export * from './product';
export * from './coupon';

import { Product } from './product';

/**
 * 장바구니 항목에 대한 타입 정의
 */
export interface CartItem {
  /**
   * 장바구니에 담긴 상품
   */
  product: Product;

  /**
   * 담긴 수량
   */
  quantity: number;
}