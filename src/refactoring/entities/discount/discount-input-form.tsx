import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { percentToRate, rateToPercent } from "../../utils/percentUtils";

type DiscountInput = {
  quantity: number;
  rate: number;
};

type DiscountInputFormProps = {
  discount: DiscountInput;
  onChange: (updated: DiscountInput) => void;
  onSubmit: () => void;
};

export const DiscountInputForm = ({ discount, onChange, onSubmit }: DiscountInputFormProps) => {
  return (
    <div className="flex space-x-2">
      <Input
        type="number"
        placeholder="수량"
        value={discount.quantity}
        onChange={(e) => onChange({ ...discount, quantity: parseInt(e.target.value) })}
        className="w-1/3 p-2 border rounded"
      />
      <Input
        type="number"
        placeholder="할인율 (%)"
        value={rateToPercent(discount.rate)}
        onChange={(e) => onChange({ ...discount, rate: percentToRate(parseInt(e.target.value)) })}
        className="w-1/3  p-2 border rounded"
      />
      <Button
        onClick={onSubmit}
        className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        할인 추가
      </Button>
    </div>
  );
};
