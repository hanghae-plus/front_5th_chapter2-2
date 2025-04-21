import { CartItem, Coupon, Product } from "../../types.ts";
import { useCart } from "../hooks";
import QuantityButton from "./cart/QuantityButton.tsx";

interface Props {
  products: Product[];
  coupons: Coupon[];
}

export const CartPage = ({ products, coupons }: Props) => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
    addToCart,
  } = useCart();

  // 장바구니에 담긴 상품의 총 금액을 계산하는 함수
  const getMaxDiscount = (discounts: { quantity: number; rate: number }[]) => {
    return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
  };

  // 장바구니에 담긴 상품의 재고를 계산하는 함수
  const getRemainingStock = (product: Product) => {
    const cartItem = cart.find((item) => item.product.id === product.id);
    return product.stock - (cartItem?.quantity || 0);
  };

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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 상품 목록 */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
          <div className="space-y-2">
            {products.map((product) => {
              const remainingStock = getRemainingStock(product);
              return (
                <div
                  key={product.id}
                  data-testid={`product-${product.id}`}
                  className="bg-white p-3 rounded shadow"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">{product.name}</span>
                    <span className="text-gray-600">
                      {product.price.toLocaleString()}원
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mb-2">
                    <span
                      className={`font-medium ${remainingStock > 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      재고: {remainingStock}개
                    </span>

                    {product.discounts.length > 0 && (
                      <span className="ml-2 font-medium text-blue-600">
                        최대{" "}
                        {(getMaxDiscount(product.discounts) * 100).toFixed(0)}%
                        할인
                      </span>
                    )}
                  </div>
                  {product.discounts.length > 0 && (
                    <ul className="list-disc list-inside text-sm text-gray-500 mb-2">
                      {product.discounts.map((discount, index) => (
                        <li key={index}>
                          {discount.quantity}개 이상:{" "}
                          {(discount.rate * 100).toFixed(0)}% 할인
                        </li>
                      ))}
                    </ul>
                  )}
                  <button
                    onClick={() => addToCart(product)}
                    className={`w-full px-3 py-1 rounded ${
                      remainingStock > 0
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={remainingStock <= 0}
                  >
                    {remainingStock > 0 ? "장바구니에 추가" : "품절"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        {/* 장바구니 내역 */}
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
      </div>
    </div>
  );
};
