import { CartItem, Coupon } from "../../types";
import { useCart } from "../hooks";
import { calculateCartTotal } from "../models/cart";

interface CartListProps {
  cart: CartItem[];
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
}

// 장바구니에 담긴 상품 목록
export const CartList = ({
  cart,
  removeFromCart,
  updateQuantity,
}: CartListProps) => {
  const getAppliedDiscount = (item: CartItem) => {
    const { discounts } = item.product;
    const { quantity } = item;
    let appliedDiscount = 0;
    for (const discount of discounts) {
      if (quantity >= discount.quantity) {
        appliedDiscount = Math.max(appliedDiscount, discount.rate);
      }
    }
    return appliedDiscount;
  };

  const updateQuantityButtonClassName =
    "bg-gray-300 text-gray-800 px-2 py-1 rounded mr-1 hover:bg-gray-400";

  return (
    <div className="space-y-2">
      {cart.map((item) => {
        const appliedDiscount = getAppliedDiscount(item);
        return (
          <div
            key={item.product.id}
            className="flex justify-between items-center bg-white p-3 rounded shadow"
          >
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
            <div>
              <button
                onClick={() =>
                  updateQuantity(item.product.id, item.quantity - 1)
                }
                className={updateQuantityButtonClassName}
              >
                -
              </button>
              <button
                onClick={() =>
                  updateQuantity(item.product.id, item.quantity + 1)
                }
                className={updateQuantityButtonClassName}
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(item.product.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                삭제
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

interface CouponSelectProps {
  coupons: Coupon[];
  applyCoupon: (coupon: Coupon) => void;
  selectedCoupon: Coupon | null;
}

// 쿠폰 적용
export const CouponSelect = ({
  coupons,
  applyCoupon,
  selectedCoupon,
}: CouponSelectProps) => {
  return (
    <div className="mt-6 bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-semibold mb-2">쿠폰 적용</h2>
      <select
        onChange={(e) => applyCoupon(coupons[parseInt(e.target.value)])}
        className="w-full p-2 border rounded mb-2"
      >
        <option value="">쿠폰 선택</option>
        {coupons.map((coupon: Coupon, index: number) => (
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
  );
};

interface OrderSummaryProps {
  cart: CartItem[];
  selectedCoupon: Coupon | null;
}
// 주문 요약
export const OrderSummary = ({ cart, selectedCoupon }: OrderSummaryProps) => {
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

interface Props {
  coupons: Coupon[];
}
// 오른쪽 '장바구니 내역' 영역
export const CartDetail = ({ coupons }: Props) => {
  const { cart, removeFromCart, updateQuantity, applyCoupon, selectedCoupon } =
    useCart();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
      <CartList
        cart={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />
      <CouponSelect
        coupons={coupons}
        applyCoupon={applyCoupon}
        selectedCoupon={selectedCoupon}
      />
      <OrderSummary cart={cart} selectedCoupon={selectedCoupon} />
    </div>
  );
};
