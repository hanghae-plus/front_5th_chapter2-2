import { Coupon } from "../../../types";

interface CouponListProps {
	coupons: Coupon[];
}

export function CouponList({ coupons }: CouponListProps) {
	return (
		<div>
			<h3 className="mb-2 text-lg font-semibold">현재 쿠폰 목록</h3>
			<div className="space-y-2">
				{coupons.map((coupon, index) => (
					<CouponList.Item
						key={index}
						data-testid={`coupon-${index + 1}`}
						coupon={coupon}
					/>
				))}
			</div>
		</div>
	);
}

CouponList.Item = ({
	coupon,
	...props
}: { coupon: Coupon } & React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div className="rounded bg-gray-100 p-2" {...props}>
			{coupon.name} ({coupon.code}):
			{coupon.discountType === "amount"
				? `${coupon.discountValue}원`
				: `${coupon.discountValue}%`}{" "}
			할인
		</div>
	);
};
