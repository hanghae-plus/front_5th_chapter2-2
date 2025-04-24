import { useCartContext } from "@r/model/cart/cart-context";
import { getMaxDiscount } from "@r/model/discount/lib";
import { getRemainingStock } from "@r/model/product/lib";
import { Product } from "@r/model/product/types";
import { AddButton } from "./add-button";
import { ApplicableCouponList } from "./applicable-coupon-list";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { cart } = useCartContext();

  const remainingStock = getRemainingStock(product, cart);

  return (
    <div
      key={product.id}
      data-testid={`product-${product.id}`}
      className="bg-white p-3 rounded shadow"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold">{product.name}</span>
        <span className="text-gray-600">
          {product.price.toLocaleString()}원
        </span>
      </div>
      <div className="text-sm text-gray-500 mb-2">
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
      <ApplicableCouponList product={product} />
      <AddButton disabled={remainingStock <= 0} product={product} />
    </div>
  );
};
