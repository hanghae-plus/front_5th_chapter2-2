import { useCart } from "../../hooks";
import { CartItem, Coupon } from "../../../types.ts";
import QuantityButton from "./QuantityButton.tsx";

export default function Cart({ coupons }: { coupons: Coupon[] }) {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
  } = useCart();

  // 장바구니에 담긴 상품의 총 금액을 계산하는 함수
  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } =
    calculateTotal();

  // 적용된 할인율을 계산하는 함수
  const getAppliedDiscount = (item: CartItem) => {
    const { quantity, product } = item;

    return product.discounts.reduce((max, discount) => {
      return quantity >= discount.quantity ? Math.max(max, discount.rate) : max;
    }, 0);
  };

  // 쿠폰 선택 시 적용시키는 이벤트 핸들러
  const handleCouponChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCoupon = coupons[parseInt(e.target.value)];
    applyCoupon(selectedCoupon);
  };

  // Select-option 의 쿠폰 상품을 포맷팅하는 함수
  const formatOptionPrice = (coupon: Coupon) => {
    const { discountType, discountValue } = coupon;
    return discountType === "amount"
      ? `${discountValue}원`
      : `${discountValue}%`;
  };

  // 쿠폰 할인 금액을 포맷팅하는 함수
  const formatDiscountAmount = (coupon: Coupon) => {
    const { discountType, discountValue, name } = coupon;
    const value =
      discountType === "amount" ? `${discountValue}원` : `${discountValue}%`;
    return `${name} (${value} 할인)`;
  };

  const handleQuantity = (
    type: "PLUS" | "MINUS" | "DELETE",
    item: CartItem,
  ) => {
    const { id } = item.product;
    const { quantity } = item;

    switch (type) {
      case "PLUS":
        updateQuantity(id, quantity + 1);
        break;
      case "MINUS":
        if (quantity > 1) {
          updateQuantity(id, quantity - 1);
        } else {
          removeFromCart(id); // 수량 1일 때 삭제 처리도 가능
        }
        break;
      case "DELETE":
        removeFromCart(id);
        break;
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
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
        })}
      </div>

      <div className="mt-6 bg-white p-4 rounded shadow">
        <h2 className="text-2xl font-semibold mb-2">쿠폰 적용</h2>
        <select
          onChange={(e) => handleCouponChange(e)}
          className="w-full p-2 border rounded mb-2"
        >
          <option value="">쿠폰 선택</option>
          {coupons.map((coupon, index) => (
            <option key={coupon.code} value={index}>
              {coupon.name} - {formatOptionPrice(coupon)}
            </option>
          ))}
        </select>
        {selectedCoupon && (
          <p className="text-green-600">
            적용된 쿠폰: {formatDiscountAmount(selectedCoupon)}
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
}
