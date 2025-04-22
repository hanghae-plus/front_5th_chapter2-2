import { useCart } from "../../contexts/CartContext";

export function CartInvoice() {
	const { calculateTotal } = useCart();

	const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } =
		calculateTotal();

	return (
		<CartInvoice.Layout>
			<p>상품 금액: {totalBeforeDiscount.toLocaleString()}원</p>
			<p>상품 금액: {totalBeforeDiscount.toLocaleString()}원</p>
			<p className="text-green-600">
				할인 금액: {totalDiscount.toLocaleString()}원
			</p>
			<p className="text-xl font-bold">
				최종 결제 금액: {totalAfterDiscount.toLocaleString()}원
			</p>
		</CartInvoice.Layout>
	);
}

CartInvoice.Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="mt-6 rounded bg-white p-4 shadow">
			<h2 className="mb-2 text-2xl font-semibold">주문 요약</h2>
			<div className="space-y-1">{children}</div>
		</div>
	);
};
