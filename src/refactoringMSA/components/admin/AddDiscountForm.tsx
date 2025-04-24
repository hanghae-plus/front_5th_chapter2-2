import { useState } from 'react';
import { Discount } from '../../../types';

interface AddDiscountFormProps {
  productId: string;
  onAddDiscount: (productId: string, discount: Discount) => void;
}

/**
 * 할인 추가 폼
 * @param productId 상품 ID
 * @param onAddDiscount 할인 추가 함수
 * @returns 할인 추가 폼
 */
const AddDiscountForm = ({
  productId,
  onAddDiscount,
}: AddDiscountFormProps) => {
  const [newDiscount, setNewDiscount] = useState<Discount>({
    quantity: 0,
    rate: 0,
  });
  return (
    <div className="flex space-x-2">
      <input
        type="number"
        placeholder="수량"
        value={newDiscount.quantity}
        onChange={(e) =>
          setNewDiscount({
            ...newDiscount,
            quantity: parseInt(e.target.value),
          })
        }
        className="w-1/3 p-2 border rounded"
      />
      <input
        type="number"
        placeholder="할인율 (%)"
        value={newDiscount.rate * 100}
        onChange={(e) =>
          setNewDiscount({
            ...newDiscount,
            rate: parseInt(e.target.value) / 100,
          })
        }
        className="w-1/3 p-2 border rounded"
      />
      <button
        onClick={() => onAddDiscount(productId, newDiscount)}
        className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        할인 추가
      </button>
    </div>
  );
};

export default AddDiscountForm;
