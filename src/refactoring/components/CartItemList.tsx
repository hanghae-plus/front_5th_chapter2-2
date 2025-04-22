import { getMaxApplicableDiscount } from "../models/cart";
import { Button } from "./ui/Button";
import { useCart } from "../contexts/CartContext";

export function CartItemList() {
	const { cart, removeFromCart, updateQuantity } = useCart();

	return (
		<CartItemList.Layout>
			{cart.map((item) => {
				const appliedDiscount = getMaxApplicableDiscount(item);
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
		</CartItemList.Layout>
	);
}

CartItemList.Layout = ({ children }: { children: React.ReactNode }) => {
	return <div className="space-y-2">{children}</div>;
};
