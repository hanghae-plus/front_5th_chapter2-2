import { useForm } from "@r/hooks/use-form";
import { useCouponContext } from "@r/model/coupon/coupon-context";
import { Coupon } from "@r/model/coupon/types";
import { Input } from "@r/shared/ui/input";

export const AddCouponForm = () => {
  const { addCoupon } = useCouponContext();

  const { formValues, handleFormChange, handleFormReset } = useForm<Coupon>({
    name: "",
    code: "",
    discountType: "percentage",
    discountValue: 0,
  });

  const handleAddCoupon = () => {
    addCoupon({ ...formValues });
    handleFormReset();
  };

  return (
    <div className="space-y-2 mb-4">
      <Input
        name="name"
        placeholder="쿠폰 이름"
        value={formValues.name}
        onChange={handleFormChange}
      />
      <Input
        name="code"
        placeholder="쿠폰 코드"
        value={formValues.code}
        onChange={handleFormChange}
      />

      <div className="flex gap-2">
        <select
          value={formValues.discountType}
          name="discountType"
          onChange={handleFormChange}
          className="w-full p-2 border rounded"
        >
          <option value="amount">금액(원)</option>
          <option value="percentage">할인율(%)</option>
        </select>
        <Input
          type="number"
          name="discountValue"
          placeholder="할인 값"
          value={formValues.discountValue}
          onChange={handleFormChange}
        />
      </div>
      <button
        onClick={handleAddCoupon}
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        쿠폰 추가
      </button>
    </div>
  );
};
