import { useState } from "react"
import { CartItem, Coupon, Product } from "../../types"
import { calculateCartTotal, updateCartItemQuantity, findCartItemByProductId } from "../models/cart.ts"

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null)

  const getRemainingStock = (product: Product) => {
    const cartItem = findCartItemByProductId(cart, product.id)
    return product.stock - (cartItem?.quantity || 0)
  }

  const addToCart = (product: Product) => {
    const remainingStock = getRemainingStock(product)
    if (remainingStock <= 0) return

    setCart((prevCart) => {
      const existingItem = findCartItemByProductId(prevCart, product.id)
      if (existingItem) {
        return updateCartItemQuantity(prevCart, product.id, existingItem.quantity + 1)
      }
      return [...prevCart, { product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => updateCartItemQuantity(prevCart, productId, 0))
  }

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart((prevCart) => updateCartItemQuantity(prevCart, productId, newQuantity))
  }

  // TODO: 쿠폰 관련 로직 분리
  const applyCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon)
  }

  const calculateTotal = () => {
    return calculateCartTotal(cart, selectedCoupon)
  }

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
  }
}
