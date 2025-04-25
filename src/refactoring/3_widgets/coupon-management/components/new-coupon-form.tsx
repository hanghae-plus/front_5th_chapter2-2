import { NewCouponFormProps } from "../types";
import { useCouponForm } from "../hooks/use-coupon-form";

export const NewCouponForm: React.FC<NewCouponFormProps> = ({ onSubmit }) => {
  const {
    formData,
    handleNameChange,
    handleCodeChange,
    handleDiscountTypeChange,
    handleDiscountValueChange,
    resetForm,
  } = useCouponForm();

  const handleSubmitClick = () => {
    onSubmit(formData);
    resetForm();
  };

  return (
    <div className="space-y-2 mb-4">
      <input
        data-testid="coupon-name-input"
        type="text"
        placeholder="쿠폰 이름"
        value={formData.name}
        onChange={handleNameChange}
        className="w-full p-2 border rounded"
      />
      <input
        data-testid="coupon-code-input"
        type="text"
        placeholder="쿠폰 코드"
        value={formData.code}
        onChange={handleCodeChange}
        className="w-full p-2 border rounded"
      />
      <div className="flex gap-2">
        <select
          data-testid="coupon-type-select"
          value={formData.discountType}
          onChange={handleDiscountTypeChange}
          className="w-full p-2 border rounded"
        >
          <option value="amount">금액(원)</option>
          <option value="percentage">할인율(%)</option>
        </select>
        <input
          data-testid="coupon-value-input"
          type="number"
          placeholder="할인 값"
          value={formData.discountValue}
          onChange={handleDiscountValueChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={handleSubmitClick}
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        쿠폰 추가
      </button>
    </div>
  );
};
