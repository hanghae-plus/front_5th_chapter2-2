//상품 수정 UI

import React from 'react';
import { InputField }from '../common/InputField';
import { Button } from '../common/Button';
import { ProductEditFormProps } from '../../types/props/ProductEditForm';

export const ProductEditForm: React.FC<ProductEditFormProps> = ({
  product,
  onChangeName,
  onChangePrice,
  onChangeStock,
  onSubmit
}) => {
  return (
    <div className="space-y-3">
      <InputField
        label="상품명"
        type="text"
        value={product.name}
        onChange={(e) => onChangeName(e.target.value)}
      />
      <InputField
        label="가격"
        type="number"
        value={product.price}
        onChange={(e) => onChangePrice(parseInt(e.target.value) || 0)}
      />
      <InputField
        label="재고"
        type="number"
        value={product.stock}
        onChange={(e) => onChangeStock(parseInt(e.target.value) || 0)}
      />
      <Button variant="primary" onClick={onSubmit}>
        수정 완료
      </Button>
    </div>
  );
};

export default ProductEditForm;