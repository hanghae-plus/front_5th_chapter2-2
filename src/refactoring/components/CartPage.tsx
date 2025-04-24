import { Coupon, Product } from "../../types.ts";
import { useCart } from "../hooks";
import CartProductItem from "./cart/CartProductItem.tsx";
import CartItemRow from "./cart/CartItemRow.tsx";

interface Props {
  products: Product[];
  coupons: Coupon[];
}

export const CartPage = ({ products, coupons }: Props) => {
  const {
    cart,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
    addToCart,
    updateQuantity,
    removeFromCart,
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
              const maxDiscountRate = (
                getMaxDiscount(product.discounts) * 100
              ).toFixed(0);

              return (
                <CartProductItem
                  key={product.id}
                  product={product}
                  remainingStock={remainingStock}
                  maxDiscountRate={parseInt(maxDiscountRate)}
                  onAddToCart={() => addToCart(product)}
                />
              );
            })}
          </div>
        </div>

        {/* 장바구니 내역 */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
          <div className="space-y-2">
            {cart.map((item) => {
              return (
                <CartItemRow
                  item={item}
                  key={item.product.id}
                  onUpdateQuantity={updateQuantity}
                  onRemoveFromCart={removeFromCart}
                />
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
