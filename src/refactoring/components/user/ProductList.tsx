import { Product } from "../../../types";
import { useCart } from "../../contexts/CartContext";
import { getRemainingStock } from "../../models/cart";
import { ProductItem } from "./ProductItem";

interface ProductListProps {
	products: Product[];
}

export function ProductList({ products }: ProductListProps) {
	const { cart, addToCart } = useCart();

	return (
		<ProductList.Layout>
			{products.map((product) => {
				const remainingStock = getRemainingStock(cart, product);

				return (
					<ProductItem
						key={product.id}
						product={product}
						remainingStock={remainingStock}
						onAddToCart={addToCart}
					/>
				);
			})}
		</ProductList.Layout>
	);
}

ProductList.Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<h2 className="mb-4 text-2xl font-semibold">상품 목록</h2>
			<div className="space-y-2">{children}</div>
		</div>
	);
};
