import { getRemainingStock } from "@refactoring/calculations/cart/calc-item";
import { getMaxDiscount } from "@refactoring/calculations/discount/calc-discount-rate";
import { CartItem, Product } from "@refactoring/entities";
import { Button, ListWrapper, Section } from "@refactoring/ui";
import { formatCurrency, rateToPercent } from "@refactoring/utils";

interface Props {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product) => void;
}

export const ProductSection = ({ products, cart, addToCart }: Props) => {
  return (
    <Section title="상품 목록">
      <ListWrapper>
        {products.map((product) => {
          const remainingStock = getRemainingStock(product, cart);
          return (
            <div
              key={product.id}
              data-testid={`product-${product.id}`}
              className="bg-white p-3 rounded shadow"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{product.name}</span>
                <span className="text-gray-600">{formatCurrency(product.price)}</span>
              </div>
              <div className="text-sm text-gray-500 mb-2">
                <span
                  className={`font-medium ${remainingStock > 0 ? "text-green-600" : "text-red-600"}`}
                >
                  재고: {remainingStock}개
                </span>
                {product.discounts.length > 0 && (
                  <span className="ml-2 font-medium text-blue-600">
                    최대 {(getMaxDiscount(product.discounts) * 100).toFixed(0)}% 할인
                  </span>
                )}
              </div>
              {product.discounts.length > 0 && (
                <ul className="list-disc list-inside text-sm text-gray-500 mb-2">
                  {product.discounts.map((discount, index) => (
                    <li key={index}>
                      {discount.quantity}개 이상: {rateToPercent(discount.rate)}% 할인
                    </li>
                  ))}
                </ul>
              )}
              <Button
                onClick={() => addToCart(product)}
                className={`w-full px-3 py-1 rounded ${
                  remainingStock > 0
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={remainingStock <= 0}
              >
                {remainingStock > 0 ? "장바구니에 추가" : "품절"}
              </Button>
            </div>
          );
        })}
      </ListWrapper>
    </Section>
  );
};
