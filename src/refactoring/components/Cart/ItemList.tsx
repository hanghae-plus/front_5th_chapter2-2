import { CartItem as CartItemType, Product } from "../../../types";
import { getRemainingStock } from "../../models/cart";
import { Item } from "./Item";

export const ItemList = ({
  products,
  cart,
  addToCart,
}: {
  products: Product[];
  cart: CartItemType[];
  addToCart: (product: Product) => void;
}) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
      <div className="space-y-2">
        {products.map((product) => {
          return (
            <Item
              key={product.id}
              product={product}
              addToCart={addToCart}
              remainingStock={getRemainingStock(cart, product)}
            />
          );
        })}
      </div>
    </div>
  );
};
