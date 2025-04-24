import { useCouponForm } from "../../../hooks/useCouponForm.ts"
import Button from "../../ui/Button.tsx"
import Input, { InputType } from "../../ui/Input.tsx"
import Select from "../../ui/Select.tsx"

export default function CouponForm() {
  const { newCoupon, handleInputChange, handleAddCoupon } = useCouponForm()

  // 할인 유형 옵션 정의
  const discountTypeOptions = [
    { label: "금액(원)", value: "amount" },
    { label: "할인율(%)", value: "percentage" },
  ]

  return (
    <div className="space-y-2 mb-4">
      <Input
        placeholder="쿠폰 이름"
        value={newCoupon.name}
        onChange={(e) => handleInputChange("name", e.target.value)}
        className="w-full p-2 border rounded"
      />
      <Input
        placeholder="쿠폰 코드"
        value={newCoupon.code}
        onChange={(e) => handleInputChange("code", e.target.value)}
        className="w-full p-2 border rounded"
      />
      <div className="flex gap-2">
        <Select
          options={discountTypeOptions}
          value={newCoupon.discountType}
          onChange={(e) => handleInputChange("discountType", e.target.value as "amount" | "percentage")}
        />
        <Input
          type={InputType.Number}
          placeholder="할인 값"
          value={newCoupon.discountValue}
          onChange={(e) => handleInputChange("discountValue", parseInt(e.target.value))}
          className="w-full p-2 border rounded"
        />
      </div>
      <Button onClick={handleAddCoupon} className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
        쿠폰 추가
      </Button>
    </div>
  )
}
