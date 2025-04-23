import { Product } from "../../../types";
import ProductListItem from "./ProductListItem";

interface Props {
	products: Product[]
	getRemainingStock: (product: Product) => number
	getMaxDiscount: (discounts: { quantity: number; rate: number }[]) => number
	addToCart: (product: Product) => void
}

function ProductList({ products, getRemainingStock, getMaxDiscount, addToCart }: Props) {
	return (
		<div>
			<h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
			<div className="space-y-2">
				{products.map(product => {
					const remainingStock = getRemainingStock(product);
					return (
						<ProductListItem
							product={product}
							remainingStock={remainingStock}
							getMaxDiscount={getMaxDiscount}
							addToCart={addToCart}
						/>
					);
				})}
			</div>
		</div>
	)
}

export default ProductList