import { DiscountEditorProps } from "../types";
import { useDiscountEditor } from "../hooks/use-discount-editor";

export const DiscountEditor: React.FC<DiscountEditorProps> = ({
  discounts,
  addDiscount,
  removeDiscount,
}) => {
  const {
    newDiscount,
    handleDiscountQuantityChange,
    handleDiscountRateChange,
    resetDiscount,
  } = useDiscountEditor();

  const handleAddDiscountClick = () => {
    addDiscount(newDiscount);
    resetDiscount();
  };

  return (
    <div>
      <h4 className="text-lg font-semibold mb-2">할인 정보</h4>
      {discounts.map((discount, index) => (
        <div key={index} className="flex justify-between items-center mb-2">
          <span>
            {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
          </span>
          <button
            onClick={() => removeDiscount(index)}
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
          onChange={handleDiscountQuantityChange}
          className="w-1/3 p-2 border rounded"
        />
        <input
          type="number"
          placeholder="할인율 (%)"
          value={newDiscount.rate * 100}
          onChange={handleDiscountRateChange}
          className="w-1/3 p-2 border rounded"
        />
        <button
          onClick={handleAddDiscountClick}
          className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          할인 추가
        </button>
      </div>
    </div>
  );
};
