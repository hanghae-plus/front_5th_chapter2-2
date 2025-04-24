export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  discounts: Discount[];
}

export interface Discount {
  quantity: number;
  rate: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Coupon {
  name: string;
  code: string;
  discountType: 'amount' | 'percentage';
  discountValue: number;
}

export interface CouponDiscountProps {
  coupon: Coupon | null;
  beforeAppliedCoupon: number;
}

export interface TotalDiscountProps {
  cart: CartItem[];
  coupon: Coupon | null;
  totalBeforeDiscount: number;
}
