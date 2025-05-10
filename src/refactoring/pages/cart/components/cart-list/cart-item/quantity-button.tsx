import { useCartContext } from "@r/model/cart/cart-context";
import { CartItem } from "@r/model/cart/types";

interface Props {
  label: string;
  step: number;
  item: CartItem;
}

export const CartItemQuantityButton: React.FC<Props> = ({
  label,
  step,
  item,
}) => {
  const { updateQuantity } = useCartContext();
  return (
    <button
      onClick={() => updateQuantity(item.product.id, item.quantity + step)}
      className="bg-gray-300 text-gray-800 px-2 py-1 rounded mr-1 hover:bg-gray-400"
    >
      {label}
    </button>
  );
};
