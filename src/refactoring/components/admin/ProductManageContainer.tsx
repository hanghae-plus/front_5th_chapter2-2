import { Product } from "../../../types";
import { ToggleButton } from "../ToggleButton";
import { ProductAddForm } from "./ProductAddForm";
import { ProductEditAccordion } from "./ProductEditAccordion";

interface ProductManageContainerProps {
	products: Product[];
	onProductAdd: (product: Product) => void;
	onProductUpdate: (product: Product) => void;
}

export function ProductManageContainer({
	products,
	onProductAdd,
	onProductUpdate,
}: ProductManageContainerProps) {
	return (
		<ProductManageContainer.Layout>
			<ToggleButton
				color="green"
				showLabel="새 상품 추가"
				hideLabel="취소"
				render={(closeForm) => (
					<ProductAddForm onProductAdd={onProductAdd} onComplete={closeForm} />
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
		</ProductManageContainer.Layout>
	);
}

ProductManageContainer.Layout = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<div>
			<h2 className="mb-4 text-2xl font-semibold">상품 관리</h2>
			{children}
		</div>
	);
};
