import { Coupon, Product } from "../../types.ts";
import { ProductEditAccordion } from "./ProductEditAccordion.tsx";
import { AddNewProductForm } from "./AddNewProductForm.tsx";
import { ToggleButton } from "./ui/ToggleButton.tsx";
import { AddCouponForm } from "./AddCouponForm.tsx";
import { CouponList } from "./CouponList.tsx";

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
			<div>
				<h2 className="mb-4 text-2xl font-semibold">상품 관리</h2>
				<ToggleButton
					color="green"
					showLabel="새 상품 추가"
					hideLabel="취소"
					render={(closeForm) => (
						<AddNewProductForm
							onProductAdd={onProductAdd}
							onAddComplete={closeForm}
						/>
					)}
				/>
				<div className="space-y-2">
					{products.map((product, index) => (
						<ProductEditAccordion
							key={product.id}
							data-testid={`product-${index + 1}`}
							product={product}
							onProductUpdate={onProductUpdate}
						/>
					))}
				</div>
			</div>
			<div>
				<h2 className="mb-4 text-2xl font-semibold">쿠폰 관리</h2>
				<div className="rounded bg-white p-4 shadow">
					<AddCouponForm onCouponAdd={onCouponAdd} />
					<CouponList coupons={coupons} />
				</div>
			</div>
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
