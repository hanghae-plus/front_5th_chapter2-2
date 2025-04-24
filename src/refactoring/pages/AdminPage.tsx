import { Coupon, Product } from "../../types.ts";
import { ProductManageContainer } from "../components/admin/ProductManageContainer.tsx";
import { CouponManageContainer } from "../components/admin/CouponManageContainer.tsx";

interface Props {
	products: Product[];
	coupons: Coupon[];
	onProductUpdate: (updatedProduct: Product) => void;
	onProductAdd: (newProduct: Product) => void;
	onCouponAdd: (newCoupon: Coupon) => void;
}

export const AdminPage = ({
	products,
	coupons,
	onProductUpdate,
	onProductAdd,
	onCouponAdd,
}: Props) => {
	return (
		<AdminPage.Layout>
			<ProductManageContainer
				products={products}
				onProductAdd={onProductAdd}
				onProductUpdate={onProductUpdate}
			/>
			<CouponManageContainer coupons={coupons} onCouponAdd={onCouponAdd} />
		</AdminPage.Layout>
	);
};

AdminPage.Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="container mx-auto p-4">
			<h1 className="mb-6 text-3xl font-bold">관리자 페이지</h1>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">{children}</div>
		</div>
	);
};
