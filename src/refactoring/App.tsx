import { CartPage } from "./pages/CartPage.tsx";
import { AdminPage } from "./pages/AdminPage.tsx";
import { MOCK_PRODUCTS } from "./__mocks__/products.ts";
import { MOCK_COUPONS } from "./__mocks__/coupons.ts";
import { useProducts } from "./hooks/useProduct.ts";
import { useCoupons } from "./hooks/useCoupon.ts";
import { NavigationBar } from "./components/NavigationBar.tsx";
import { useAdmin } from "./contexts/AdminContext.tsx";

const App = () => {
	const { products, updateProduct, addProduct } = useProducts(MOCK_PRODUCTS);
	const { coupons, addCoupon } = useCoupons(MOCK_COUPONS);
	const { isAdmin } = useAdmin();

	return (
		<App.Layout>
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
		</App.Layout>
	);
};

App.Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="min-h-screen bg-gray-100">
			<NavigationBar />
			<main className="container mx-auto mt-6">{children}</main>
		</div>
	);
};

export default App;
