import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

type CouponInput = {
  name: string;
  code: string;
  discountType: "amount" | "percentage";
  discountValue: number;
};

type CouponInputFormProps = {
  coupon: CouponInput;
  onChange: (updated: CouponInput) => void;
  onSubmit: () => void;
};

export const CouponInputForm = ({ coupon, onChange, onSubmit }: CouponInputFormProps) => {
  return (
    <div className="space-y-2 mb-4">
      <Input
        placeholder="쿠폰 이름"
        value={coupon.name}
        onChange={(e) => onChange({ ...coupon, name: e.target.value })}
        className="w-full"
      />
      <Input
        placeholder="쿠폰 코드"
        value={coupon.code}
        onChange={(e) => onChange({ ...coupon, code: e.target.value })}
        className="w-full"
      />
      <div className="flex gap-2">
        <select
          value={coupon.discountType}
          onChange={(e) =>
            onChange({
              ...coupon,
              discountType: e.target.value as "amount" | "percentage",
            })
          }
          className="w-full p-2 border rounded"
        >
          <option value="amount">금액(원)</option>
          <option value="percentage">할인율(%)</option>
        </select>
        <Input
          type="number"
          placeholder="할인 값"
          value={coupon.discountValue}
          onChange={(e) => onChange({ ...coupon, discountValue: parseInt(e.target.value) })}
          className="w-full"
        />
      </div>
      <Button
        onClick={onSubmit}
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        쿠폰 추가
      </Button>
    </div>
  );
};
