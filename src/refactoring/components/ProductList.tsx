import {Discount, Product} from "../../types.ts";
import {ProductItem} from "./ProductItem.tsx";

interface ProductListProps {
  products: Product[];
  addToCart: (product: Product) => void;
  getProductRemainingStock: (product: Product) => number;
  getMaxDiscount: (discounts: Discount[]) => number;
}

export const ProductList = ({products, addToCart, getProductRemainingStock, getMaxDiscount}:ProductListProps) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
      <div className="space-y-2">
        {products.map(product => (
          <ProductItem
            key={product.id}
            product={product}
            addToCart={addToCart}
            remainingStock={getProductRemainingStock(product)}
            maxDiscount={getMaxDiscount(product.discounts)}
          />
        ))}
      </div>
    </div>
  )
}