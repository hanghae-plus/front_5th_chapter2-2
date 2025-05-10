import { CartItem as ICartItem } from "@r/model/cart/types";
import { CartItemQuantityButton } from "./quantity-button";
import { CartItemRemoveButton } from "./remove-button";
import { CartItemDisplay } from "./item-display";

interface CartItemProps {
  item: ICartItem;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  return (
    <div className="flex justify-between items-center bg-white p-3 rounded shadow">
      <CartItemDisplay item={item} />
      <div>
        <CartItemQuantityButton label={"-"} step={-1} item={item} />
        <CartItemQuantityButton label={"+"} step={1} item={item} />
        <CartItemRemoveButton item={item} />
      </div>
    </div>
  );
};
