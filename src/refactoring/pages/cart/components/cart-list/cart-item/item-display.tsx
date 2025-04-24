import { getMaxApplicableDiscount } from "@r/model/cart/lib";
import { CartItem } from "@r/model/cart/types";

interface Props {
  item: CartItem;
}

export const CartItemDisplay: React.FC<Props> = ({ item }) => {
  const appliedDiscount = getMaxApplicableDiscount(item);

  return (
    <div>
      <span className="font-semibold">{item.product.name}</span>
      <br />
      <span className="text-sm text-gray-600">
        {item.product.price}원 x {item.quantity}
        {appliedDiscount > 0 && (
          <span className="text-green-600 ml-1">
            ({(appliedDiscount * 100).toFixed(0)}% 할인 적용)
          </span>
        )}
      </span>
    </div>
  );
};
