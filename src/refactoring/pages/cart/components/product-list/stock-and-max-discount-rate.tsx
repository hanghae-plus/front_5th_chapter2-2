import { useCartContext } from "@r/model/cart/cart-context";
import { getMaxDiscount } from "@r/model/discount/lib";
import { getRemainingStock } from "@r/model/product/lib";
import { Product } from "@r/model/product/types";

interface Props {
  product: Product;
}

export const StockAndMaxDiscountRate: React.FC<Props> = ({ product }) => {
  const { cart } = useCartContext();

  const remainingStock = getRemainingStock(product, cart);
  const maxDiscountPercent = (getMaxDiscount(product.discounts) * 100).toFixed(
    0
  );

  return (
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
          최대 {maxDiscountPercent}% 할인
        </span>
      )}
    </div>
  );
};
