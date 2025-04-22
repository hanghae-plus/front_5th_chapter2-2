import { Coupon } from "../../../types";
import { CouponAddForm } from "./CouponAddForm";
import { CouponList } from "./CouponList";

interface CouponManageContainerProps {
	coupons: Coupon[];
	onCouponAdd: (coupon: Coupon) => void;
}

export function CouponManageContainer({
	coupons,
	onCouponAdd,
}: CouponManageContainerProps) {
	return (
		<CouponManageContainer.Layout>
			<CouponAddForm onCouponAdd={onCouponAdd} />
			<CouponList coupons={coupons} />
		</CouponManageContainer.Layout>
	);
}

CouponManageContainer.Layout = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<div>
			<h2 className="mb-4 text-2xl font-semibold">쿠폰 관리</h2>
			<div className="rounded bg-white p-4 shadow">{children}</div>
		</div>
	);
};
