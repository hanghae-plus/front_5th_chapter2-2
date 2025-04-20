import { ICartItem, ICoupon } from "../../types";

export const calculateItemTotal = (item: ICartItem) => {
  return 0;
};

export const getMaxApplicableDiscount = (item: ICartItem) => {
  return 0;
};

export const calculateCartTotal = (cart: ICartItem[], selectedCoupon: ICoupon | null) => {
  return {
    totalBeforeDiscount: 0,
    totalAfterDiscount: 0,
    totalDiscount: 0,
  };
};

export const updateCartItemQuantity = (cart: ICartItem[], productId: string, newQuantity: number): ICartItem[] => {
  return [];
};
