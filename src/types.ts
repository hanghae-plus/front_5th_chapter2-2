export interface Product {
  id: string
  name: string
  price: number
  stock: number
  discounts: Discount[]
}

export interface Discount {
  quantity: number
  rate: number
}

export interface CartItem {
  product: Product
  quantity: number
}

// Cart.ts
export type Cart = CartItem[]

export interface Coupon {
  name: string
  code: string
  discountType: "amount" | "percentage"
  discountValue: number
}
