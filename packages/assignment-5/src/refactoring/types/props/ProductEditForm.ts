import { Product } from '../product';

/**
 * ProductEditForm에 전달되는 props입니다.
 */
export interface ProductEditFormProps {
  /**
   * 수정 대상이 되는 상품 정보
   */
  product: Product;

  /**
   * 상품명 변경 핸들러
   */
  onChangeName: (name: string) => void;

  /**
   * 가격 변경 핸들러
   */
  onChangePrice: (price: number) => void;

  /**
   * 재고 변경 핸들러
   */
  onChangeStock: (stock: number) => void;

  /**
   * 수정 완료 핸들러
   */
  onSubmit: () => void;
}