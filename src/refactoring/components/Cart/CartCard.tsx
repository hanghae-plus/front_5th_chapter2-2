import { CartItem } from "../../../types";
import { Button } from "../Common/Button";

interface Props {
  cartItem: CartItem;
  appliedDiscount: number;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
}

export const CartCard = ({
  cartItem,
  appliedDiscount,
  updateQuantity,
  removeFromCart,
}: Props) => {
  const handleIncreaseQuantity = () => {
    updateQuantity(cartItem.product.id, cartItem.quantity + 1);
  };
  const handleDecreaseQuantity = () => {
    updateQuantity(cartItem.product.id, cartItem.quantity - 1);
  };

  return (
    <div
      key={cartItem.product.id}
      className="flex justify-between items-center bg-white p-3 rounded shadow"
    >
      <div>
        <span className="font-semibold">{cartItem.product.name}</span>
        <br />
        <span className="text-sm text-gray-600">
          {cartItem.product.price}원 x {cartItem.quantity}
          {appliedDiscount > 0 && (
            <span className="text-green-600 ml-1">
              ({(appliedDiscount * 100).toFixed(0)}% 할인 적용)
            </span>
          )}
        </span>
      </div>
      <div>
        <Button
          onClick={handleDecreaseQuantity}
          variant="secondary"
          className="px-2 py-1 mr-1"
        >
          -
        </Button>

        <Button
          onClick={handleIncreaseQuantity}
          variant="secondary"
          className="px-2 py-1 mr-1"
        >
          +
        </Button>

        <Button
          onClick={() => removeFromCart(cartItem.product.id)}
          variant="danger"
          className="px-2 py-1"
        >
          삭제
        </Button>
      </div>
    </div>
  );
};
