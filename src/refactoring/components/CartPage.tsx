import { CartItem, Coupon, Product } from "../../types.ts";
import { useCart } from "../hooks";
import { getMaxApplicableDiscount } from "../models/cart.ts";
import { Button } from "./ui/Button.tsx";

interface Props {
	products: Product[];
	coupons: Coupon[];
}

export const CartPage = ({ products, coupons }: Props) => {
	const {
		cart,
		addToCart,
		removeFromCart,
		updateQuantity,
		applyCoupon,
		calculateTotal,
		selectedCoupon,
	} = useCart();

	const getMaxDiscount = (discounts: { quantity: number; rate: number }[]) => {
		return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
	};

	const getRemainingStock = (product: Product) => {
		const cartItem = cart.find((item) => item.product.id === product.id);
		return product.stock - (cartItem?.quantity || 0);
	};

	const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } =
		calculateTotal();

	const getAppliedDiscount = (item: CartItem) => {
		return getMaxApplicableDiscount(item);
	};

	return (
		<CartPage.Layout>
			<div>
				<h2 className="mb-4 text-2xl font-semibold">상품 목록</h2>
				<div className="space-y-2">
					{products.map((product) => {
						const remainingStock = getRemainingStock(product);
						return (
							<div
								key={product.id}
								data-testid={`product-${product.id}`}
								className="rounded bg-white p-3 shadow"
							>
								<div className="mb-2 flex items-center justify-between">
									<span className="font-semibold">{product.name}</span>
									<span className="text-gray-600">
										{product.price.toLocaleString()}원
									</span>
								</div>
								<div className="mb-2 text-sm text-gray-500">
									<span
										className={`font-medium ${
											remainingStock > 0 ? "text-green-600" : "text-red-600"
										}`}
									>
										재고: {remainingStock}개
									</span>
									{product.discounts.length > 0 && (
										<span className="ml-2 font-medium text-blue-600">
											최대{" "}
											{(getMaxDiscount(product.discounts) * 100).toFixed(0)}%
											할인
										</span>
									)}
								</div>
								{product.discounts.length > 0 && (
									<ul className="mb-2 list-inside list-disc text-sm text-gray-500">
										{product.discounts.map((discount, index) => (
											<li key={index}>
												{discount.quantity}개 이상:{" "}
												{(discount.rate * 100).toFixed(0)}% 할인
											</li>
										))}
									</ul>
								)}
								<Button
									color={remainingStock > 0 ? "blue" : "gray"}
									className="w-full px-3 py-1"
									onClick={() => addToCart(product)}
								>
									{remainingStock > 0 ? "장바구니에 추가" : "품절"}
								</Button>
							</div>
						);
					})}
				</div>
			</div>
			<div>
				<h2 className="mb-4 text-2xl font-semibold">장바구니 내역</h2>

				<div className="space-y-2">
					{cart.map((item) => {
						const appliedDiscount = getAppliedDiscount(item);
						return (
							<div
								key={item.product.id}
								className="flex items-center justify-between rounded bg-white p-3 shadow"
							>
								<div>
									<span className="font-semibold">{item.product.name}</span>
									<br />
									<span className="text-sm text-gray-600">
										{item.product.price}원 x {item.quantity}
										{appliedDiscount > 0 && (
											<span className="ml-1 text-green-600">
												({(appliedDiscount * 100).toFixed(0)}% 할인 적용)
											</span>
										)}
									</span>
								</div>
								<div>
									<Button
										color="gray"
										onClick={() =>
											updateQuantity(item.product.id, item.quantity - 1)
										}
									>
										-
									</Button>
									<Button
										color="gray"
										onClick={() =>
											updateQuantity(item.product.id, item.quantity + 1)
										}
									>
										+
									</Button>
									<Button
										color="red"
										className="px-2 py-1"
										onClick={() => removeFromCart(item.product.id)}
									>
										삭제
									</Button>
								</div>
							</div>
						);
					})}
				</div>

				<div className="mt-6 rounded bg-white p-4 shadow">
					<h2 className="mb-2 text-2xl font-semibold">쿠폰 적용</h2>
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

				<div className="mt-6 rounded bg-white p-4 shadow">
					<h2 className="mb-2 text-2xl font-semibold">주문 요약</h2>
					<div className="space-y-1">
						<p>상품 금액: {totalBeforeDiscount.toLocaleString()}원</p>
						<p className="text-green-600">
							할인 금액: {totalDiscount.toLocaleString()}원
						</p>
						<p className="text-xl font-bold">
							최종 결제 금액: {totalAfterDiscount.toLocaleString()}원
						</p>
					</div>
				</div>
			</div>
		</CartPage.Layout>
	);
};

CartPage.Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="container mx-auto p-4">
			<h1 className="mb-6 text-3xl font-bold">장바구니</h1>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">{children}</div>
		</div>
	);
};
