import { CartItem as CartItemType } from "../../../types";
import { getMaxApplicableDiscount } from "../../models/cart";
import { Button } from "../ui/Button";
import { useCart } from "../../contexts/CartContext";

interface CartItemProps {
	item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
	const { updateQuantity, removeFromCart } = useCart();

	const appliedDiscount = getMaxApplicableDiscount(item);
	const { product, quantity } = item;

	return (
		<CartItem.Layout>
			<CartItem.Info item={item} appliedDiscount={appliedDiscount} />
			<CartItem.Actions
				onAdd={() => updateQuantity(product.id, quantity + 1)}
				onDecrease={() => updateQuantity(product.id, quantity - 1)}
				onRemove={() => removeFromCart(product.id)}
			/>
		</CartItem.Layout>
	);
}

CartItem.Info = ({
	item,
	appliedDiscount,
}: {
	item: CartItemType;
	appliedDiscount: number;
}) => {
	const { product, quantity } = item;

	return (
		<div>
			<span className="font-semibold">{product.name}</span>
			<br />
			<span className="text-sm text-gray-600">
				{product.price}원 x {quantity}
				{appliedDiscount > 0 && (
					<span className="ml-1 text-green-600">
						({(appliedDiscount * 100).toFixed(0)}% 할인 적용)
					</span>
				)}
			</span>
		</div>
	);
};

CartItem.Actions = ({
	onAdd,
	onDecrease,
	onRemove,
}: {
	onAdd: () => void;
	onDecrease: () => void;
	onRemove: () => void;
}) => {
	return (
		<div>
			<Button color="gray" onClick={onDecrease}>
				-
			</Button>
			<Button color="gray" onClick={onAdd}>
				+
			</Button>
			<Button color="red" className="px-2 py-1" onClick={onRemove}>
				삭제
			</Button>
		</div>
	);
};

CartItem.Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex items-center justify-between rounded bg-white p-3 shadow">
			{children}
		</div>
	);
};
