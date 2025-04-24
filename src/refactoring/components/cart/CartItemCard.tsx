import { CartItem } from "../../../types";
import { Button, Text } from "../common";

interface CartItemCardProps {
  item: CartItem;
  appliedDiscount: number;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveFromCart: (productId: string) => void;
}

export const CartItemCard = ({
  item,
  appliedDiscount,
  onUpdateQuantity,
  onRemoveFromCart,
}: CartItemCardProps) => {
  return (
    <div className="flex justify-between items-center bg-white p-3 rounded shadow">
      <div>
        <Text className="font-semibold">{item.product.name}</Text>
        <br />
        <Text size="sm" color="gray">
          {item.product.price}원 x {item.quantity}
          {appliedDiscount > 0 && (
            <Text color="green" className="ml-1">
              ({(appliedDiscount * 100).toFixed(0)}% 할인 적용)
            </Text>
          )}
        </Text>
      </div>
      <div>
        <Button
          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
          color="gray"
          className="px-2 py-1 mr-1"
        >
          -
        </Button>
        <Button
          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
          color="gray"
          className="px-2 py-1 mr-1"
        >
          +
        </Button>
        <Button
          onClick={() => onRemoveFromCart(item.product.id)}
          color="red"
          className="px-2 py-1"
        >
          삭제
        </Button>
      </div>
    </div>
  );
};
