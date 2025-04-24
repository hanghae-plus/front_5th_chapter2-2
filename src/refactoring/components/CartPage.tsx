import CartLineItem from "./cart/CartLineItem.tsx"
import CouponSelector from "./cart/CouponSelector.tsx"
import OrderSummary from "./cart/OrderSummary.tsx"
import ProductList from "./cart/ProductList.tsx"
import { useCartContext } from "../context/CartContext.tsx"

export const CartPage = () => {
  const { cart } = useCartContext()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 상품 목록 */}
        <ProductList cart={cart} />

        {/* 장바구니 내역 */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>

          <div className="space-y-2">
            {cart.map((cartItem) => (
              <CartLineItem item={cartItem} key={cartItem.product.id} />
            ))}
          </div>

          {/* 쿠폰 적용 */}
          <CouponSelector />

          {/* 주문 요약 */}
          <OrderSummary />
        </div>
      </div>
    </div>
  )
}
