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

export const DISCOUNT_TYPE = {
  AMOUNT: "amount",
  PERCENTAGE: "percentage",
} as const;

export type DiscountType = (typeof DISCOUNT_TYPE)[keyof typeof DISCOUNT_TYPE];

export interface Coupon {
  name: string;
  code: string;
  discountType: DiscountType;
  discountValue: number;
}

export const PERMISSION_TYPE = {
  USER: "user",
  ADMIN: "admin",
} as const;

export type Permission = (typeof PERMISSION_TYPE)[keyof typeof PERMISSION_TYPE];

export const SERVICE_TYPE = {
  USER: "user",
  ADMIN: "admin",
} as const;

export type ServiceType = (typeof SERVICE_TYPE)[keyof typeof SERVICE_TYPE];
