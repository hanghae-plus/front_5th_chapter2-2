import { Coupon, Product } from "../../types.ts";
import { ProductEditAccordion } from "./ProductEditAccordion.tsx";
import { AddNewProductForm } from "./AddNewProductForm.tsx";
import { ToggleButton } from "./ui/ToggleButton.tsx";
import { AddCouponForm } from "./AddCouponForm.tsx";

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
		<div className="container mx-auto p-4">
			<h1 className="mb-6 text-3xl font-bold">관리자 페이지</h1>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
						<div>
							<h3 className="mb-2 text-lg font-semibold">현재 쿠폰 목록</h3>
							<div className="space-y-2">
								{coupons.map((coupon, index) => (
									<div
										key={index}
										data-testid={`coupon-${index + 1}`}
										className="rounded bg-gray-100 p-2"
									>
										{coupon.name} ({coupon.code}):
										{coupon.discountType === "amount"
											? `${coupon.discountValue}원`
											: `${coupon.discountValue}%`}{" "}
										할인
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
