import { Coupon } from "../../../../types";
import { CouponFormInput } from "./CouponFormInput";
import { CouponFormSelect } from "./CouponFormSelect";
import { Button } from "../../common";
interface CouponFormProps {
  coupon: Coupon;
  onChange: (coupon: Coupon) => void;
  onSubmit: () => void;
}

export const CouponForm = ({ coupon, onChange, onSubmit }: CouponFormProps) => {
  return (
    <div className="space-y-2 mb-4">
      <CouponFormInput
        placeholder="쿠폰 이름"
        value={coupon.name}
        onChange={(e) => onChange({ ...coupon, name: e.target.value })}
      />
      <CouponFormInput
        placeholder="쿠폰 코드"
        value={coupon.code}
        onChange={(e) => onChange({ ...coupon, code: e.target.value })}
      />
      <div className="flex gap-2">
        <CouponFormSelect
          value={coupon.discountType}
          onChange={(e) =>
            onChange({
              ...coupon,
              discountType: e.target.value as "amount" | "percentage",
            })
          }
          options={[
            { value: "amount", label: "금액(원)" },
            { value: "percentage", label: "할인율(%)" },
          ]}
        />
        <CouponFormInput
          type="number"
          placeholder="할인 값"
          value={coupon.discountValue}
          onChange={(e) =>
            onChange({
              ...coupon,
              discountValue: parseInt(e.target.value),
            })
          }
        />
      </div>
      <Button color="green" size="full" className="p-2" onClick={onSubmit}>
        쿠폰 추가
      </Button>
    </div>
  );
};
