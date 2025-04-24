import { useCart } from "../../contexts/CartContext";
import { CartItem } from "./CartItem";

export function CartItemList() {
	const { cart } = useCart();

	return (
		<CartItemList.Layout>
			{cart.map((item) => (
				<CartItem key={item.product.id} item={item} />
			))}
		</CartItemList.Layout>
	);
}

CartItemList.Layout = ({ children }: { children: React.ReactNode }) => {
	return <div className="space-y-2">{children}</div>;
};
