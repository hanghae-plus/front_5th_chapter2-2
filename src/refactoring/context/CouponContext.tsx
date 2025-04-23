import { createContext, ReactNode, useContext } from "react"

import { useCoupons } from "../hooks"
import { Coupon } from "../../types.ts"

// 초기 쿠폰 데이터
const initialCoupons: Coupon[] = [
  {
    name: "5000원 할인 쿠폰",
    code: "AMOUNT5000",
    discountType: "amount",
    discountValue: 5000,
  },
  {
    name: "10% 할인 쿠폰",
    code: "PERCENT10",
    discountType: "percentage",
    discountValue: 10,
  },
]

// Context 타입 정의
type CouponContextType = {
  coupons: Coupon[]
  addCoupon: (coupon: Coupon) => void
}

// Context 생성
const CouponContext = createContext<CouponContextType | undefined>(undefined)

// Provider 컴포넌트
export function CouponProvider({ children }: { children: ReactNode }) {
  const { coupons, addCoupon } = useCoupons(initialCoupons)

  return <CouponContext.Provider value={{ coupons, addCoupon }}>{children}</CouponContext.Provider>
}

// Context를 쉽게 사용하기 위한 훅
export function useCouponContext() {
  const context = useContext(CouponContext)
  if (context === undefined) {
    throw new Error("useCouponContext는 CouponProvider 내에서만 사용할 수 있습니다.")
  }
  return context
}
