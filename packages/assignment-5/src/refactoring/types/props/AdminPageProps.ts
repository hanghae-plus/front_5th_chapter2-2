/**
 * AdminPage 컴포넌트에서 사용하는 Props 타입 정의
 */

import { Product } from '../product';
import { Coupon } from '../coupon';

/**
 * AdminPage에 전달되는 props입니다.
 */
export interface AdminPageProps {
  /**
   * 현재 등록된 전체 상품 목록
   */
  products: Product[];

  /**
   * 현재 사용 가능한 쿠폰 목록
   */
  coupons: Coupon[];

  /**
   * 상품 정보를 수정할 때 호출되는 함수
   * @param updatedProduct 수정된 상품
   */
  onProductUpdate: (updatedProduct: Product) => void;

  /**
   * 새로운 상품을 추가할 때 호출되는 함수
   * @param newProduct 새로 추가할 상품
   */
  onProductAdd: (newProduct: Product) => void;

  /**
   * 새로운 쿠폰을 추가할 때 호출되는 함수
   * @param newCoupon 새로 추가할 쿠폰
   */
  onCouponAdd: (newCoupon: Coupon) => void;
}