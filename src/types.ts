export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  discounts: Discount[]; // 예시: discounts: [{ quantity: 10, rate: 0.1 }]
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
