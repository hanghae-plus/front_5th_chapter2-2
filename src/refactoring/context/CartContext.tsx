import { createContext, ReactNode, useContext } from "react"
import { useCart } from "../hooks"
import { CartItem, Coupon, Product } from "../../types.ts"

export type CartContextType = {
  cart: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, newQuantity: number) => void
  applyCoupon: (coupon: Coupon) => void
  calculateTotal: () => {
    totalBeforeDiscount: number
    totalAfterDiscount: number
    totalDiscount: number
  }
  selectedCoupon: Coupon | null
}
// Context 생성
const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const { cart, addToCart, removeFromCart, updateQuantity, applyCoupon, calculateTotal, selectedCoupon } = useCart()
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        applyCoupon,
        calculateTotal,
        selectedCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// Context를 쉽게 사용하기 위한 훅
export function useCartContext() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCartContext는 CartProvider 내에서만 사용할 수 있습니다.")
  }
  return context
}
