import { CartItem, Product } from "../../../types";
import { AddToCart } from "./AddToCart";
import { DiscountList } from "./DiscountList";

interface ItemProps {
  product: Product;
  cart: CartItem[];
  addToCart: (product: Product) => void;
}

const Item = ({ product, cart, addToCart }: ItemProps) => {
  const getMaxDiscount = (discounts: { quantity: number; rate: number }[]) => {
    return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
  };

  const getRemainingStock = (product: Product) => {
    const cartItem = cart.find((item) => item.product.id === product.id);
    return product.stock - (cartItem?.quantity || 0);
  };

  const remainingStock = getRemainingStock(product);
  return (
    <div
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
      <DiscountList product={product} />
      <AddToCart
        remainingStock={remainingStock}
        handler={() => addToCart(product)}
      />
    </div>
  );
};
interface Props {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product) => void;
}

export const ProductList = ({ products, cart, addToCart }: Props) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
      <div className="space-y-2">
        {products.map((product) => (
          <Item
            key={product.id}
            product={product}
            cart={cart}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
};
