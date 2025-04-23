import { Coupon } from "../../../types"
import CartCouponApplied from "./CartCouponApplied"
import CartCouponSelectBox from "./CartCouponSelectBox"

interface Props {
	coupons: Coupon[]
	applyCoupon: (coupon: Coupon) => void
	selectedCoupon: Coupon | null
}

function CartCoupon({ coupons, applyCoupon, selectedCoupon }: Props) {
	return (
		<div className="mt-6 bg-white p-4 rounded shadow">
		<h2 className="text-2xl font-semibold mb-2">쿠폰 적용</h2>
		<CartCouponSelectBox coupons={coupons} applyCoupon={applyCoupon} />
		{selectedCoupon && (
			<CartCouponApplied selectedCoupon={selectedCoupon} />
		)}
	</div>
	)
}

export default CartCoupon