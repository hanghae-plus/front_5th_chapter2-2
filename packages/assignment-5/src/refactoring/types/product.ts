/**
 * 상품(Product) 및 할인(Discount) 타입 정의
 */

/**
 * 개별 상품 정보를 나타내는 인터페이스
 */
export interface Product {
  /**
   * 상품 고유 ID
   */
  id: string;

  /**
   * 상품 이름
   */
  name: string;

  /**
   * 상품 가격 (원 단위)
   */
  price: number;

  /**
   * 상품 재고 수량
   */
  stock: number;

  /**
   * 적용 가능한 할인 목록
   */
  discounts: Discount[];
}

/**
 * 할인 정보에 대한 인터페이스
 */
export interface Discount {
  /**
   * 몇 개 이상 구매 시 할인 적용되는 수량 기준
   */
  quantity: number;

  /**
   * 할인율 (예: 0.1은 10%)
   */
  rate: number;
}