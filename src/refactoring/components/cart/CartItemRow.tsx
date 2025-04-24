import QuantityButton from "./QuantityButton.tsx";
import { CartItem } from "../../../types.ts";

export default function CartItemRow({
  item,
  onUpdateQuantity,
  onRemoveFromCart,
}: {
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveFromCart: (id: string) => void;
  item: CartItem;
}) {
  // 적용된 할인율을 계산하는 함수
  const getAppliedDiscount = () => {
    const { quantity, product } = item;

    return product.discounts.reduce((max, discount) => {
      return quantity >= discount.quantity ? Math.max(max, discount.rate) : max;
    }, 0);
  };

  const handleQuantity = (
    type: "PLUS" | "MINUS" | "DELETE",
    item: CartItem,
  ) => {
    const { id } = item.product;
    const { quantity } = item;

    switch (type) {
      case "PLUS":
        onUpdateQuantity(id, quantity + 1);
        break;
      case "MINUS":
        if (quantity > 1) {
          onUpdateQuantity(id, quantity - 1);
        } else {
          onRemoveFromCart(id); // 수량 1일 때 삭제 처리도 가능
        }
        break;
      case "DELETE":
        onRemoveFromCart(id);
        break;
    }
  };

  return (
    <div className="flex justify-between items-center bg-white p-3 rounded shadow">
      <div>
        <span className="font-semibold">{item.product.name}</span>
        <br />
        <span className="text-sm text-gray-600">
          {item.product.price}원 x {item.quantity}
          {getAppliedDiscount() > 0 && (
            <span className="text-green-600 ml-1">
              ({(getAppliedDiscount() * 100).toFixed(0)}% 할인 적용)
            </span>
          )}
        </span>
      </div>
      <div>
        <QuantityButton
          type="MINUS"
          onClick={() => handleQuantity("MINUS", item)}
        >
          -
        </QuantityButton>

        <QuantityButton
          type="PLUS"
          onClick={() => handleQuantity("PLUS", item)}
        >
          +
        </QuantityButton>

        <QuantityButton
          type="DELETE"
          onClick={() => handleQuantity("DELETE", item)}
        >
          삭제
        </QuantityButton>
      </div>
    </div>
  );
}
