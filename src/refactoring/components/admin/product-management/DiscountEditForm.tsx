import { Discount } from "../../../../types.ts";
import { FormInput } from "../../ui/FormInput.tsx";
import { useDiscountForm } from "./hooks/useDiscountForm.ts";

type Props = {
  initialDiscounts: Discount[];
  onDiscountsChange: (discounts: Discount[]) => void;
};

export const DiscountEditForm = ({
  initialDiscounts,
  onDiscountsChange,
}: Props) => {
  const {
    discounts,
    newDiscount,
    setNewDiscount,
    handleAddDiscount,
    handleRemoveDiscount,
  } = useDiscountForm(initialDiscounts);

  const addDiscount = () => {
    const updatedDiscounts = handleAddDiscount();
    if (updatedDiscounts) {
      onDiscountsChange(updatedDiscounts);
    }
  };

  const removeDiscount = (index: number) => {
    const updatedDiscounts = handleRemoveDiscount(index);
    onDiscountsChange(updatedDiscounts);
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
        <FormInput
          type="number"
          placeholder="수량"
          value={newDiscount.quantity}
          onChange={(value) =>
            setNewDiscount({
              ...newDiscount,
              quantity: value as number,
            })
          }
          className="w-full p-2 border rounded"
          containerClassName="w-1/3"
        />
        <FormInput
          type="number"
          placeholder="할인율 (%)"
          value={newDiscount.rate * 100}
          onChange={(value) =>
            setNewDiscount({
              ...newDiscount,
              rate: (value as number) / 100,
            })
          }
          className="w-full p-2 border rounded"
          containerClassName="w-1/3"
        />
        <button
          onClick={addDiscount}
          className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          할인 추가
        </button>
      </div>
    </div>
  );
};
