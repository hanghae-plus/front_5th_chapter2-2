//상품 1개 UI + 토글
import React from 'react';
import { Button } from '../common/Button';
import {InputField }from '../common/InputField';
import { ProductCardProps } from '../../types/props/ProductCardProps';

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isOpen,
  isEditing,
  editingProduct,
  newDiscount,
  onToggle,
  onEdit,
  onChangeName,
  onChangePrice,
  onChangeStock,
  onAddDiscount,
  onRemoveDiscount,
  onChangeDiscountQuantity,
  onChangeDiscountRate,
  onEditComplete,
}) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <button
        onClick={onToggle}
        className="w-full text-left font-semibold"
      >
        {product.name} - {product.price}원 (재고: {product.stock})
      </button>
      {isOpen && (
        <div className="mt-2">
          {isEditing && editingProduct ? (
            <>
              <InputField
                label="상품명"
                type="text"
                value={editingProduct.name}
                onChange={(e) => onChangeName(e.target.value)}
              />
              <InputField
                label="가격"
                type="number"
                value={editingProduct.price}
                onChange={(e) => onChangePrice(parseInt(e.target.value) || 0)}
              />
              <InputField
                label="재고"
                type="number"
                value={editingProduct.stock}
                onChange={(e) => onChangeStock(parseInt(e.target.value) || 0)}
              />

              <h4 className="text-lg font-semibold mb-2">할인 정보</h4>
              {editingProduct.discounts.map((discount, index) => (
                <div key={index} className="flex justify-between items-center mb-2">
                  <span>{discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인</span>
                  <Button
                    variant="danger"
                    onClick={() => onRemoveDiscount(index)}
                  >
                    삭제
                  </Button>
                </div>
              ))}
              <div className="flex gap-2 mb-2">
                <InputField
                  type="number"
                  placeholder="수량"
                  value={newDiscount.quantity}
                  onChange={(e) => onChangeDiscountQuantity(parseInt(e.target.value) || 0)}
                />
                <InputField
                  type="number"
                  placeholder="할인율 (%)"
                  value={newDiscount.rate * 100}
                  onChange={(e) => onChangeDiscountRate(parseInt(e.target.value) / 100)}
                />
                <Button onClick={onAddDiscount}>
                  할인 추가
                </Button>
              </div>

              <Button onClick={onEditComplete} variant="primary">
                수정 완료
              </Button>
            </>
          ) : (
            <>
              {product.discounts.map((discount, index) => (
                <div key={index} className="mb-2">
                  <span>{discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인</span>
                </div>
              ))}
              <Button onClick={onEdit} variant="primary" className="mt-2">
                수정
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};


