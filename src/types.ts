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
  CART: "cart",
  ADMIN: "admin",
} as const;

export type ServiceType = (typeof SERVICE_TYPE)[keyof typeof SERVICE_TYPE];

export const MEMBERSHIP_TYPE = {
  BASIC: "basic",
  SILVER: "silver",
  GOLD: "gold",
  VIP: "vip",
} as const;

export type MembershipType = (typeof MEMBERSHIP_TYPE)[keyof typeof MEMBERSHIP_TYPE];

export type Updater<T> = (prev: T) => T;

export type Storage<T> = {
  item: T;
  setItem: (prev: T | Updater<T>) => void; // SetStateAction<T>
};

export const LOCAL_STORAGE_KEY = {
  CART: "cart",
  COUPON: "coupon",
  PRODUCT: "product",
} as const;

export type LocalStorageKeyType = (typeof LOCAL_STORAGE_KEY)[keyof typeof LOCAL_STORAGE_KEY];
