import { Coupon } from "../../types";
import { CartCoupon } from "./CartCoupon";
import { CartInvoice } from "./CartInvoice";
import { CartItemList } from "./CartItemList";

interface CartContainerProps {
	coupons: Coupon[];
}

export function CartContainer({ coupons }: CartContainerProps) {
	return (
		<CartContainer.Layout>
			<CartItemList />
			<CartCoupon coupons={coupons} />
			<CartInvoice />
		</CartContainer.Layout>
	);
}

CartContainer.Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<h2 className="mb-4 text-2xl font-semibold">장바구니 내역</h2>
			{children}
		</div>
	);
};
