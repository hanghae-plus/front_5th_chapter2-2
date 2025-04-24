import { Product } from "../../../types";
import { getMaxDiscount } from "../../models/cart";
import { Button } from "../ui/Button";

interface ProductCardProps {
	product: Product;
	remainingStock: number;
	onAddToCart: (product: Product) => void;
}

export function ProductItem({
	product,
	remainingStock,
	onAddToCart,
}: ProductCardProps) {
	return (
		<div
			key={product.id}
			data-testid={`product-${product.id}`}
			className="rounded bg-white p-3 shadow"
		>
			<ProductItem.Info product={product} />
			<ProductItem.Stock product={product} remainingStock={remainingStock} />
			{product.discounts.length > 0 && (
				<ProductItem.AppliedDiscount product={product} />
			)}
			<ProductItem.Action
				remainingStock={remainingStock}
				onClick={() => onAddToCart(product)}
			/>
		</div>
	);
}

ProductItem.Info = ({ product }: { product: Product }) => {
	return (
		<div className="mb-2 flex items-center justify-between">
			<span className="font-semibold">{product.name}</span>
			<span className="text-gray-600">{product.price.toLocaleString()}원</span>
		</div>
	);
};

ProductItem.Stock = ({
	product,
	remainingStock,
}: {
	product: Product;
	remainingStock: number;
}) => {
	return (
		<div className="mb-2 text-sm text-gray-500">
			<span
				className={`font-medium ${
					remainingStock > 0 ? "text-green-600" : "text-red-600"
				}`}
			>
				재고: {remainingStock}개
			</span>
			{product.discounts.length > 0 && (
				<span className="ml-2 font-medium text-blue-600">
					최대 {(getMaxDiscount(product.discounts) * 100).toFixed(0)}% 할인
				</span>
			)}
		</div>
	);
};

ProductItem.AppliedDiscount = ({ product }: { product: Product }) => {
	return (
		<ul className="mb-2 list-inside list-disc text-sm text-gray-500">
			{product.discounts.map((discount, index) => (
				<li key={index}>
					{discount.quantity}개 이상: {(discount.rate * 100).toFixed(0)}% 할인
				</li>
			))}
		</ul>
	);
};

ProductItem.Action = ({
	remainingStock,
	onClick,
}: {
	remainingStock: number;
	onClick: () => void;
}) => {
	return (
		<Button
			color={remainingStock > 0 ? "blue" : "gray"}
			className="w-full px-3 py-1"
			onClick={onClick}
		>
			{remainingStock > 0 ? "장바구니에 추가" : "품절"}
		</Button>
	);
};
