import { Coupon } from "../../types";

import { useCart } from "../contexts/CartContext";

export function CartCoupon({ coupons }: { coupons: Coupon[] }) {
	return (
		<CartCoupon.Layout>
			<CartCoupon.Selector coupons={coupons} />
			<CartCoupon.Applied />
		</CartCoupon.Layout>
	);
}

CartCoupon.Selector = ({ coupons }: { coupons: Coupon[] }) => {
	const { applyCoupon } = useCart();

	return (
		<select
			onChange={(e) => applyCoupon(coupons[parseInt(e.target.value)])}
			className="mb-2 w-full rounded border p-2"
		>
			<option value="">쿠폰 선택</option>
			{coupons.map((coupon, index) => (
				<option key={coupon.code} value={index}>
					{coupon.name} -{" "}
					{coupon.discountType === "amount"
						? `${coupon.discountValue}원`
						: `${coupon.discountValue}%`}
				</option>
			))}
		</select>
	);
};

CartCoupon.Applied = () => {
	const { selectedCoupon } = useCart();

	if (!selectedCoupon) return null;

	return (
		<p className="text-green-600">
			적용된 쿠폰: {selectedCoupon.name}(
			{selectedCoupon.discountType === "amount"
				? `${selectedCoupon.discountValue}원`
				: `${selectedCoupon.discountValue}%`}{" "}
			할인)
		</p>
	);
};

CartCoupon.Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="mt-6 rounded bg-white p-4 shadow">
			<h2 className="mb-2 text-2xl font-semibold">쿠폰 적용</h2>
			{children}
		</div>
	);
};
