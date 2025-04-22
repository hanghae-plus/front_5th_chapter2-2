import { Coupon, Product } from "../../types.ts";
import { CartProvider } from "../contexts/CartContext.tsx";
import { CartContainer } from "./CartList.tsx";
import { ProductList } from "./ProductList.tsx";

interface Props {
	products: Product[];
	coupons: Coupon[];
}

export const CartPage = ({ products, coupons }: Props) => {
	return (
		<CartPage.Layout>
			<CartProvider>
				<ProductList products={products} />
				<CartContainer coupons={coupons} />
			</CartProvider>
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
