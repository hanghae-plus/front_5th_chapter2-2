import { Discount } from "../../../../types";

interface Props {
  newDiscount: Discount;
  setNewDiscount: React.Dispatch<React.SetStateAction<Discount>>;
  onAddDiscount: () => void;
}

const DiscountForm = ({
  newDiscount,
  setNewDiscount,
  onAddDiscount,
}: Props) => {
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDiscount({
      ...newDiscount,
      quantity: parseInt(e.target.value),
    });
  };

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDiscount({
      ...newDiscount,
      rate: parseFloat(e.target.value) / 100,
    });
  };

  return (
    <div className="mt-2">
      <div className="flex flex-wrap gap-2 mb-2">
        <input
          type="number"
          placeholder="구매 수량"
          value={newDiscount.quantity}
          onChange={handleQuantityChange}
          className="flex-1 p-2 border rounded"
          min="1"
        />
        <input
          type="number"
          placeholder="할인율 (%)"
          value={newDiscount.rate * 100}
          onChange={handleRateChange}
          className="flex-1 p-2 border rounded"
          min="0"
          max="100"
        />
        <button
          onClick={onAddDiscount}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          할인 추가
        </button>
      </div>
    </div>
  );
};

export default DiscountForm;
