import { Coupon } from '../coupon/types';
import { Product } from '../product/types';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface TotalDiscountProps {
  cart: CartItem[];
  coupon: Coupon | null;
  totalBeforeDiscount: number;
}
