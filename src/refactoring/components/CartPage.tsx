import { Coupon, Product } from "../../types.ts"
import { useCart } from "../hooks"
import ProductCard from "./cart/ProductCard.tsx"
import CartLineItem from "./cart/CartLineItem.tsx"
import CouponSelector from "./cart/CouponSelector.tsx"
import OrderSummary from "./cart/OrderSummary.tsx"
import ProductList from "./cart/ProductList.tsx"

interface Props {
  products: Product[]
  coupons: Coupon[]
}

export const CartPage = ({ products, coupons }: Props) => {
  const { cart, addToCart, removeFromCart, updateQuantity, applyCoupon, calculateTotal, selectedCoupon } = useCart()

  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } = calculateTotal()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 상품 목록 */}
        <ProductList products={products} cart={cart} addToCart={addToCart} />

        {/* 장바구니 내역 */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>

          <div className="space-y-2">
            {cart.map((cartItem) => (
              <CartLineItem
                item={cartItem}
                key={cartItem.product.id}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
              />
            ))}
          </div>

          {/* 쿠폰 적용 */}
          <CouponSelector coupons={coupons} selectedCoupon={selectedCoupon} applyCoupon={applyCoupon} />

          {/* 주문 요약 */}
          <OrderSummary
            totalBeforeDiscount={totalBeforeDiscount}
            totalDiscount={totalDiscount}
            totalAfterDiscount={totalAfterDiscount}
          />
        </div>
      </div>
    </div>
  )
}
