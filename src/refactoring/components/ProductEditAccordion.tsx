import { Button } from "./ui/Button";

import { useState } from "react";
import { Discount, Product } from "../../types.ts";
import {
	Accordion,
	AccordionTrigger,
	AccordionContent,
} from "./ui/Accordion.tsx";
import { ProductEditForm } from "./ProductEditForm.tsx";

interface ProductEditAccordionProps
	extends React.HTMLAttributes<HTMLDivElement> {
	product: Product;
	products: Product[];
	onProductUpdate: (updatedProduct: Product) => void;
}

export function ProductEditAccordion({
	product,
	products,
	onProductUpdate,
	...props
}: ProductEditAccordionProps) {
	const [editingProduct, setEditingProduct] = useState<Product | null>(null);

	// handleEditProduct 함수 수정
	const handleEditProduct = (product: Product) => {
		setEditingProduct({ ...product });
	};

	return (
		<Accordion className="rounded bg-white p-4 shadow" {...props}>
			<AccordionTrigger data-testid="toggle-button">
				{product.name} - {product.price}원 (재고: {product.stock})
			</AccordionTrigger>
			<AccordionContent>
				{editingProduct && editingProduct.id === product.id ? (
					<ProductEditForm
						editingProduct={editingProduct}
						setEditingProduct={setEditingProduct}
						products={products}
						onProductUpdate={onProductUpdate}
					/>
				) : (
					<div>
						{product.discounts.map((discount, index) => (
							<div key={index} className="mb-2">
								<span>
									{discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
								</span>
							</div>
						))}
						<Button
							color="blue"
							data-testid="modify-button"
							onClick={() => handleEditProduct(product)}
						>
							수정
						</Button>
					</div>
				)}
			</AccordionContent>
		</Accordion>
	);
}
