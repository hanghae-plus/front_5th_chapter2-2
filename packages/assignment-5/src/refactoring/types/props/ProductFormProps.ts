import { Product } from '../product';

/**
 * ProductForm 컴포넌트의 props 타입입니다.
 */
export interface ProductFormProps {
  /**
   * 입력 폼에서 사용하는 상품 데이터 (id 제외)
   */
  product: Omit<Product, 'id'>;

  /**
   * 폼 입력값이 변경될 때 호출됩니다.
   * @param updated 변경된 상품 정보
   */
  onChange: (updated: Omit<Product, 'id'>) => void;

  /**
   * 상품 추가 또는 수정 완료 시 호출됩니다.
   */
  onSubmit: () => void;

  /**
   * 폼 입력을 취소할 때 호출됩니다.
   */
  onCancel: () => void;
}