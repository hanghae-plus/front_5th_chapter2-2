import { CardWithTitle } from "../../../\bui/card-with-title";
import { CartItem } from "../../../entities";
import { useSelectedCoupon } from "../../../hooks";
import { calculateCartTotal } from "../../../models/cart";

interface Props {
  cart: CartItem[];
}

export const CartPriceSummary = ({ cart }: Props) => {
  const { selectedCoupon } = useSelectedCoupon();
  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } = calculateCartTotal(
    cart,
    selectedCoupon,
  );

  return (
    <CardWithTitle title="주문 요약">
      <div className="space-y-1">
        <p>상품 금액: {totalBeforeDiscount.toLocaleString()}원</p>
        <p className="text-green-600">할인 금액: {totalDiscount.toLocaleString()}원</p>
        <p className="text-xl font-bold">최종 결제 금액: {totalAfterDiscount.toLocaleString()}원</p>
      </div>
    </CardWithTitle>
  );
};
