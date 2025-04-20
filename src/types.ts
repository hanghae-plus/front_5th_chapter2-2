export interface IDiscount {
  quantity: number;
  rate: number;
}

export interface IProduct {
  id: string;
  name: string;
  price: number;
  stock: number;
  discounts: IDiscount[];
}

export interface ICartItem {
  product: IProduct;
  quantity: number;
}

export type TDiscountType = "amount" | "percentage";

export interface ICoupon {
  name: string;
  code: string;
  discountType: TDiscountType;
  discountValue: number;
}
