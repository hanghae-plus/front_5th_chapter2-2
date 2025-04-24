import { CartItem, Coupon } from "../../../entities";
import { calculateCartTotal } from "../../../models/cart";
import { CardWithTitle } from "../../../ui/card-with-title";

interface Props {
  cart: CartItem[];
  selectedCoupon: Coupon | null;
}

export const CartPriceSummary = ({ cart, selectedCoupon }: Props) => {
  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } = calculateCartTotal(
    cart,
    selectedCoupon,
  );
  4;
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
