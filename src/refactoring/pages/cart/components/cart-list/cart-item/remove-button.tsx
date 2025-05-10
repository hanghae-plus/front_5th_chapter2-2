import { useCartContext } from "@r/model/cart/cart-context";
import { CartItem } from "@r/model/cart/types";

interface Props {
  item: CartItem;
}

export const CartItemRemoveButton: React.FC<Props> = ({ item }) => {
  const { removeFromCart } = useCartContext();

  return (
    <button
      onClick={() => removeFromCart(item.product.id)}
      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
    >
      삭제
    </button>
  );
};
