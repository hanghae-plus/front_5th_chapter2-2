import { useState } from "react";
import { CartPage } from "./pages/CartPage.tsx";
import { AdminPage } from "./pages/AdminPage.tsx";
import { Button } from "./components/ui/Button.tsx";
import { MOCK_PRODUCTS } from "./__mocks__/products.ts";
import { MOCK_COUPONS } from "./__mocks__/coupons.ts";
import { useProducts } from "./hooks/useProduct.ts";
import { useCoupons } from "./hooks/useCoupon.ts";

const App = () => {
	const { products, updateProduct, addProduct } = useProducts(MOCK_PRODUCTS);
	const { coupons, addCoupon } = useCoupons(MOCK_COUPONS);
	const [isAdmin, setIsAdmin] = useState(false);

	return (
		<div className="min-h-screen bg-gray-100">
			<nav className="bg-blue-600 p-4 text-white">
				<div className="container mx-auto flex items-center justify-between">
					<h1 className="text-2xl font-bold">쇼핑몰 관리 시스템</h1>
					<Button color="white" onClick={() => setIsAdmin(!isAdmin)}>
						{isAdmin ? "장바구니 페이지로" : "관리자 페이지로"}
					</Button>
				</div>
			</nav>
			<main className="container mx-auto mt-6">
				{isAdmin ? (
					<AdminPage
						products={products}
						coupons={coupons}
						onProductUpdate={updateProduct}
						onProductAdd={addProduct}
						onCouponAdd={addCoupon}
					/>
				) : (
					<CartPage products={products} coupons={coupons} />
				)}
			</main>
		</div>
	);
};

export default App;
