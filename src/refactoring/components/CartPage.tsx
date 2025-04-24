import { Coupon, Product } from '../../types.ts';
import { useCart } from '../hooks';
import { getRemainingStock } from '../utils/cart';
import { ProductCard } from "./CartPage/ProductCard.tsx";
import { CartItemRow } from "./CartPage/CartItemRow.tsx";
import { Heading } from "./ui/Heading.tsx";


interface Props {
  products: Product[];
  coupons: Coupon[];
}

export const CartPage = ({ products, coupons }: Props) => {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
  } = useCart();

  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } = calculateTotal();

  return (
    <div className="container mx-auto p-4">
      <Heading level={1}>장바구니</Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Heading level={2}>상품 목록</Heading>
          <div className="space-y-2">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                remainingStock={getRemainingStock(product, cart)}
                onAddToCart={() => addToCart(product)}
              />
            ))}
          </div>
        </div>

        <div>
          <Heading level={2}>장바구니 내역</Heading>
          <div className="space-y-2">
            {cart.map(item => (
              <CartItemRow
                key={item.product.id}
                item={item}
                onIncrease={() => updateQuantity(item.product.id, item.quantity + 1)}
                onDecrease={() => updateQuantity(item.product.id, item.quantity - 1)}
                onRemove={() => removeFromCart(item.product.id)}
              />
            ))}
          </div>

          <div className="mt-6 bg-white p-4 rounded shadow">
            <Heading level={2}>쿠폰 적용</Heading>
            <select
              onChange={(e) => applyCoupon(coupons[parseInt(e.target.value)])}
              className="w-full p-2 border rounded mb-2"
            >
              <option value="">쿠폰 선택</option>
              {coupons.map((coupon, index) => (
                <option key={coupon.code} value={index}>
                  {coupon.name} - {coupon.discountType === 'amount' ? `${coupon.discountValue}원` : `${coupon.discountValue}%`}
                </option>
              ))}
            </select>
            {selectedCoupon && (
              <p className="text-green-600">
                적용된 쿠폰: {selectedCoupon.name}
                ({selectedCoupon.discountType === 'amount' ? `${selectedCoupon.discountValue}원` : `${selectedCoupon.discountValue}%`} 할인)
              </p>
            )}
          </div>

          <div className="mt-6 bg-white p-4 rounded shadow">
            <Heading level={2}>주문 요약</Heading>
            <div className="space-y-1">
              <p>상품 금액: {totalBeforeDiscount.toLocaleString()}원</p>
              <p className="text-green-600">할인 금액: {totalDiscount.toLocaleString()}원</p>
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
