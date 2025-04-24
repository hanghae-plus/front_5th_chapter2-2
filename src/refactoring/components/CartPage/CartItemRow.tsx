import { CartItem } from "../../../types.ts";
import { getAppliedDiscount } from "../../utils/cart.ts";
import { Card } from "../ui/Card.tsx";
import { Button } from "../ui/Button.tsx";

export const CartItemRow = ({
                              item,
                              onIncrease,
                              onDecrease,
                              onRemove,
                            }: {
  item: CartItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}) => {
  const appliedDiscount = getAppliedDiscount(item);
  return (
    <Card className="flex justify-between items-center">
      <div>
        <span className="font-semibold">{item.product.name}</span>
        <br />
        <span className="text-sm text-gray-600">
          {item.product.price.toLocaleString()}원 x {item.quantity}
          {appliedDiscount > 0 && (
            <span className="text-green-600 ml-1">
              ({(appliedDiscount * 100).toFixed(0)}% 할인 적용)
            </span>
          )}
        </span>
      </div>
      <div>
        <Button onClick={onDecrease} className="mr-1 bg-gray-300 text-gray-800 hover:bg-gray-400">
          -
        </Button>
        <Button onClick={onIncrease} className="mr-1 bg-gray-300 text-gray-800 hover:bg-gray-400">
          +
        </Button>
        <Button onClick={onRemove} className="bg-red-500 hover:bg-red-600">
          삭제
        </Button>
      </div>
    </Card>
  );
};
