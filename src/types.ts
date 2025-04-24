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

/**
 * 할인 타입
 * amount: 금액 할인
 * percentage: 퍼센트 할인
 */
export type TDiscountType = "amount" | "percentage";

export interface ICoupon {
  name: string;
  code: string;
  discountType: TDiscountType;
  discountValue: number;
}
