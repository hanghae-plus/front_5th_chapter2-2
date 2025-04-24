import { CartItem } from "../../../../types.ts";
import { getMaxApplicableDiscount } from "../../../models/cart.ts";
import { Button } from "../../ui/Button";
import { Card } from "../../ui/Card.tsx";

type Props = {
  cartItem: CartItem;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
};

export const CartItemCard = ({
  cartItem,
  updateQuantity,
  removeFromCart,
}: Props) => {
  const appliedDiscount = getMaxApplicableDiscount(cartItem);

  const handleIncreaseQuantity = () => {
    updateQuantity(cartItem.product.id, cartItem.quantity + 1);
  };

  const handleDecreaseQuantity = () =>
    updateQuantity(cartItem.product.id, cartItem.quantity - 1);

  const handleRemoveItem = () => removeFromCart(cartItem.product.id);

  return (
    <Card>
      <Card.Content className="flex justify-between items-center">
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
            variant="secondary"
            size="sm"
            onClick={handleDecreaseQuantity}
          >
            -
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleIncreaseQuantity}
            className="mx-1"
          >
            +
          </Button>
          <Button variant="danger" size="sm" onClick={handleRemoveItem}>
            삭제
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};
