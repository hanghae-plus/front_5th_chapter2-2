import { CartItem } from "../../../../entities/cart/types";
import { CartItemView } from "../../../../entities/cart/ui";
import { Coupon } from "../../../../entities/coupon/types";
import { useCoupon } from "../../../../features/coupon/hooks";

interface CartContainerProps {
  cart: CartItem[];
  updateQuantity: (productId: string, newQuantity: number) => void;
  removeFromCart: (productId: string) => void;
  applyCoupon: (coupon: Coupon) => void;
  selectedCoupon: Coupon | null;
  calculateTotal: () => {
    totalBeforeDiscount: number;
    totalAfterDiscount: number;
    totalDiscount: number;
  };
}

export const CartContainer: React.FC<CartContainerProps> = ({
  cart,
  updateQuantity,
  removeFromCart,
  applyCoupon,
  selectedCoupon,
  calculateTotal,
}) => {
  const { coupons } = useCoupon();
  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } =
    calculateTotal();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
      <div className="space-y-2">
        {cart.map((item) => (
          <CartItemView
            key={item.product.id}
            item={item}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
          />
        ))}
      </div>

      <div className="mt-6 bg-white p-4 rounded shadow">
        <h2 className="text-2xl font-semibold mb-2">쿠폰 적용</h2>
        <select
          onChange={(e) => applyCoupon(coupons[parseInt(e.target.value)])}
          className="w-full p-2 border rounded mb-2"
        >
          <option value="">쿠폰 선택</option>
          {coupons.map((coupon, index) => (
            <option key={coupon.code} value={index}>
              {coupon.name} -{" "}
              {coupon.discountType === "amount"
                ? `${coupon.discountValue}원`
                : `${coupon.discountValue}%`}
            </option>
          ))}
        </select>
        {selectedCoupon && (
          <p className="text-green-600">
            적용된 쿠폰: {selectedCoupon.name}(
            {selectedCoupon.discountType === "amount"
              ? `${selectedCoupon.discountValue}원`
              : `${selectedCoupon.discountValue}%`}{" "}
            할인)
          </p>
        )}
      </div>

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
    </div>
  );
};
