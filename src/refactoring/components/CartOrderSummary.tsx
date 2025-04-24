import { CartItem, Coupon } from "../../types";
import { calculateCartTotal } from "../models/cart";

interface CartOrderSummaryProps {
  cart: CartItem[];
  selectedCoupon: Coupon | null;
}

// 주문 요약
export const CartOrderSummary = ({
  cart,
  selectedCoupon,
}: CartOrderSummaryProps) => {
  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } =
    calculateCartTotal(cart, selectedCoupon);

  return (
    <div className="mt-6 bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-semibold mb-2">주문 요약</h2>
      <div className="space-y-1">
        <p>상품 금액: {totalBeforeDiscount.toLocaleString()}원</p>
        <p className="text-green-600">
          할인 금액: {totalDiscount.toLocaleString()}원
        </p>
        <p className="text-xl font-bold">
          최종 결제 금액: {totalAfterDiscount.toLocaleString()}원
        </p>
      </div>
    </div>
  );
};
