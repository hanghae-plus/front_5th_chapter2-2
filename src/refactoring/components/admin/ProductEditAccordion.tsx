import { Button } from "../ui/Button.tsx";

import { useState } from "react";
import { Discount, Product } from "../../../types.ts";
import {
	Accordion,
	AccordionTrigger,
	AccordionContent,
} from "../ui/Accordion.tsx";
import { ProductEditForm } from "./ProductEditForm.tsx";

interface ProductEditAccordionProps
	extends React.HTMLAttributes<HTMLDivElement> {
	product: Product;
	onProductUpdate: (updatedProduct: Product) => void;
}

export function ProductEditAccordion({
	product,
	onProductUpdate,
	...props
}: ProductEditAccordionProps) {
	const [isEditing, setIsEditing] = useState(false);

	return (
		<Accordion className="rounded bg-white p-4 shadow" {...props}>
			<AccordionTrigger data-testid="toggle-button">
				{product.name} - {product.price}원 (재고: {product.stock})
			</AccordionTrigger>
			<AccordionContent>
				{isEditing ? (
					<ProductEditForm
						product={product}
						onProductUpdate={onProductUpdate}
						onComplete={() => setIsEditing(false)}
					/>
				) : (
					<ProductEditAccordion.ProductInfo
						discounts={product.discounts}
						onStartEdit={() => setIsEditing(true)}
					/>
				)}
			</AccordionContent>
		</Accordion>
	);
}

ProductEditAccordion.ProductInfo = ({
	discounts,
	onStartEdit,
}: {
	discounts: Discount[];
	onStartEdit: () => void;
}) => {
	return (
		<div>
			{discounts.map((discount, index) => (
				<div key={index} className="mb-2">
					<span>
						{discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
					</span>
				</div>
			))}
			<Button color="blue" data-testid="modify-button" onClick={onStartEdit}>
				수정
			</Button>
		</div>
	);
};
