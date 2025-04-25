import type { Product } from '../../../../../types.ts';
import { useAdmin } from '../../../../hooks';

export function ProductDiscountManager({ product }: { product: Product }) {
  const { editingProduct, newDiscount, handleAddDiscount, handleRemoveDiscount, setNewDiscount } = useAdmin();
  if (!editingProduct) return <></>;

  function handleClickRemoveDiscount(index: number) {
    handleRemoveDiscount(product.id, index);
  }

  function handleChangeDiscountQuantity(e: React.ChangeEvent<HTMLInputElement>) {
    setNewDiscount({ ...newDiscount, quantity: parseInt(e.target.value) });
  }

  function handleChangeDiscountRate(e: React.ChangeEvent<HTMLInputElement>) {
    setNewDiscount({ ...newDiscount, rate: parseInt(e.target.value) / 100 });
  }

  function handleClickAddDiscount() {
    handleAddDiscount(product.id);
  }

  return (
    <div>
      <h4 className="text-lg font-semibold mb-2">할인 정보</h4>

      {editingProduct.discounts.map((discount, index) => (
        <div key={index} className="flex justify-between items-center mb-2">
          <span>
            {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
          </span>
          <button
            onClick={() => handleClickRemoveDiscount(index)}
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          >
            삭제
          </button>
        </div>
      ))}

      <div className="flex space-x-2">
        <input
          type="number"
          placeholder="수량"
          value={newDiscount.quantity}
          onChange={handleChangeDiscountQuantity}
          className="w-1/3 p-2 border rounded"
        />

        <input
          type="number"
          placeholder="할인율 (%)"
          value={newDiscount.rate * 100}
          onChange={handleChangeDiscountRate}
          className="w-1/3 p-2 border rounded"
        />

        <button onClick={handleClickAddDiscount} className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          할인 추가
        </button>
      </div>
    </div>
  );
}
