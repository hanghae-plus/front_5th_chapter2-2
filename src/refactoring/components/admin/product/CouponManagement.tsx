import CouponForm from "../coupon/CouponForm.tsx"
import CouponList from "../coupon/CouponList.tsx"

export default function CouponManagement() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">쿠폰 관리</h2>
      <div className="bg-white p-4 rounded shadow">
        {/* 쿠폰 등록 폼 */}
        <CouponForm />

        {/* 쿠폰 목록 */}
        <CouponList />
      </div>
    </div>
  )
}
