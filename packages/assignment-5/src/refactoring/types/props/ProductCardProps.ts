/**
 * ProductCard 컴포넌트에서 사용하는 Props 타입 정의
 */

import { Product, Discount } from '../product';

/**
 * ProductCard에 전달되는 props입니다.
 */
export interface ProductCardProps {
  /**
   * 해당 카드에 표시할 상품 정보
   */
  product: Product;

  /**
   * 아코디언 열림 여부
   */
  isOpen: boolean;

  /**
   * 현재 수정 중인지 여부
   */
  isEditing: boolean;

  /**
   * 수정 중인 상품 정보 (없을 수도 있음)
   */
  editingProduct: Product | null;

  /**
   * 새로 추가할 할인 정보
   */
  newDiscount: Discount;

  /**
   * 아코디언 토글 함수
   */
  onToggle: () => void;

  /**
   * 수정 모드로 전환하는 함수
   */
  onEdit: () => void;

  /**
   * 상품명 변경 핸들러
   */
  onChangeName: (value: string) => void;

  /**
   * 가격 변경 핸들러
   */
  onChangePrice: (value: number) => void;

  /**
   * 재고 변경 핸들러
   */
  onChangeStock: (value: number) => void;

  /**
   * 할인 정보 추가 핸들러
   */
  onAddDiscount: () => void;

  /**
   * 할인 정보 삭제 핸들러
   */
  onRemoveDiscount: (index: number) => void;

  /**
   * 새 할인 수량 입력 핸들러
   */
  onChangeDiscountQuantity: (value: number) => void;

  /**
   * 새 할인율 입력 핸들러
   */
  onChangeDiscountRate: (value: number) => void;

  /**
   * 수정 완료 핸들러
   */
  onEditComplete: () => void;
}