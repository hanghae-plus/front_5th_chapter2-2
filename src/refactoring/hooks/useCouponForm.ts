import { useCouponContext } from "../context/CouponContext.tsx"
import { useState } from "react"
import { Coupon } from "../../types.ts"

const INITIAL_COUPON_STATE: Coupon = {
  name: "",
  code: "",
  discountType: "percentage",
  discountValue: 0,
}

export function useCouponForm() {
  const { addCoupon } = useCouponContext()
  const [newCoupon, setNewCoupon] = useState<Coupon>(INITIAL_COUPON_STATE)

  const handleInputChange = (field: keyof Coupon, value: any) => {
    setNewCoupon({ ...newCoupon, [field]: value })
  }

  const handleAddCoupon = () => {
    addCoupon(newCoupon)
    setNewCoupon(INITIAL_COUPON_STATE)
  }

  return {
    newCoupon,
    handleInputChange,
    handleAddCoupon,
  }
}
