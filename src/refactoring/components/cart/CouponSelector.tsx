import { Coupon } from "../../../types.ts"
import { useCouponContext } from "../../context/CouponContext.tsx"
import Select, { SelectOption } from "../ui/Select.tsx"
import { useCartContext } from "../../context/CartContext.tsx"

export default function CouponSelector() {
  const { coupons } = useCouponContext()
  const { applyCoupon, selectedCoupon } = useCartContext()
  // 쿠폰 옵션 생성
  const couponOptions = coupons.map((coupon, index) => ({
    label: `${coupon.name} - ${
      coupon.discountType === "amount" ? `${coupon.discountValue}원` : `${coupon.discountValue}%`
    }`,
    value: index.toString(),
    data: coupon,
  }))

  // 현재 선택된 쿠폰 인덱스 찾기
  const selectedIndex = selectedCoupon
    ? coupons.findIndex((coupon) => coupon.code === selectedCoupon.code).toString()
    : ""

  return (
    <div className="mt-6 bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-semibold mb-2">쿠폰 적용</h2>
      <Select
        options={couponOptions as SelectOption<Coupon>[]}
        value={selectedIndex}
        onChange={(e) => applyCoupon(coupons[parseInt(e.target.value)])}
        placeholder="쿠폰 선택"
        className="w-full p-2 border rounded mb-2"
      />
      {selectedCoupon && (
        <p className="text-green-600">
          적용된 쿠폰: {selectedCoupon.name}(
          {selectedCoupon.discountType === "amount"
            ? `${selectedCoupon.discountValue}원`
            : `${selectedCoupon.discountValue}%`}{" "}
          할인)
        </p>
      )}
    </div>
  )
}
