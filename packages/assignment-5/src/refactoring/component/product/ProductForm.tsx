//새 상품 추가 폼
import React from 'react';
import {InputField }from '../common/InputField';
import { Button } from '../common/Button';
import { ProductFormProps } from '../../types/props/ProductFormProps';

export const ProductForm: React.FC<ProductFormProps> = ({ product, onChange, onSubmit, onCancel }) => {
  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="text-xl font-semibold mb-2">새 상품 추가</h3>
      <InputField
        label="상품명"
        type="text"
        value={product.name}
        onChange={(e) => onChange({ ...product, name: e.target.value })}
      />
      <InputField
        label="가격"
        type="number"
        value={product.price}
        onChange={(e) => onChange({ ...product, price: parseInt(e.target.value) || 0 })}
      />
      <InputField
        label="재고"
        type="number"
        value={product.stock}
        onChange={(e) => onChange({ ...product, stock: parseInt(e.target.value) || 0 })}
      />
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onCancel}>
          취소
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          추가
        </Button>
      </div>
    </div>
  );
};


