import { useState, memo } from 'react';
import type { Product, Discount } from '../../../../types';

import FieldInput from '../../ui/FieldInput';

const DiscountItem = memo(
  ({ discount, onDelete }: { discount: Discount; onDelete: () => void }) => (
    <div className="flex justify-between mb-1">
      <span>
        {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
      </span>
      <button
        onClick={onDelete}
        className="bg-red-500 text-white px-2 rounded hover:bg-red-600"
      >
        삭제
      </button>
    </div>
  ),
);

interface ProductEditorProps {
  product: Product;
  onSave: (p: Product) => void;
  onCancel: () => void;
}

export default function ProductEditor({
  product,
  onSave,
  onCancel,
}: ProductEditorProps) {
  const [draft, setDraft] = useState<Product>(product);
  const [tempDiscount, setTempDiscount] = useState<Discount>({
    quantity: 0,
    rate: 0,
  });

  const setField = <K extends keyof Product>(key: K, value: Product[K]) =>
    setDraft({ ...draft, [key]: value });

  const handleAddDiscount = () => {
    if (!tempDiscount.quantity || !tempDiscount.rate) return;
    setDraft({
      ...draft,
      discounts: [...draft.discounts, tempDiscount],
    });
    setTempDiscount({ quantity: 0, rate: 0 });
  };

  const handleRemoveDiscount = (idx: number) =>
    setDraft({
      ...draft,
      discounts: draft.discounts.filter((_, i) => i !== idx),
    });

  return (
    <div className="bg-white p-4 rounded shadow">
      <FieldInput
        label="상품명"
        value={draft.name}
        onChange={(e) => setField('name', e.target.value)}
      />
      <FieldInput
        label="가격"
        type="number"
        value={draft.price}
        onChange={(e) => setField('price', parseInt(e.target.value))}
      />
      <FieldInput
        label="재고"
        type="number"
        value={draft.stock}
        onChange={(e) => setField('stock', parseInt(e.target.value))}
      />

      <h4 className="text-lg font-semibold mb-1 mt-4">할인 정보</h4>
      {draft.discounts.map((discount, i) => (
        <DiscountItem
          key={i}
          discount={discount}
          onDelete={() => handleRemoveDiscount(i)}
        />
      ))}

      <div className="flex gap-2 mt-2">
        <input
          type="number"
          placeholder="수량"
          className="w-full p-2 border rounded"
          value={tempDiscount.quantity || ''}
          onChange={(e) =>
            setTempDiscount({
              ...tempDiscount,
              quantity: parseInt(e.target.value),
            })
          }
        />
        <input
          type="number"
          placeholder="할인율 (%)"
          className="w-full p-2 border rounded"
          value={tempDiscount.rate ? tempDiscount.rate * 100 : ''}
          onChange={(e) =>
            setTempDiscount({
              ...tempDiscount,
              rate: parseInt(e.target.value) / 100,
            })
          }
        />
        <button
          onClick={handleAddDiscount}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          할인 추가
        </button>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onSave(draft)}
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          수정 완료
        </button>
        <button
          onClick={onCancel}
          className="w-full bg-gray-300 text-gray-800 p-2 rounded hover:bg-gray-400"
        >
          취소
        </button>
      </div>
    </div>
  );
}
