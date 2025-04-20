import { CartItem, Coupon } from "../../types";
import { getTotalDiscount } from "../utils/discount";


export const calculateItemTotal = (item: CartItem) => {
  const itemTotalPrice = item.product.price * item.quantity;
  
  return itemTotalPrice * (1 - getMaxApplicableDiscount(item))
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  const maxDiscount: number = item.product.discounts.reduce((maxDiscount, discount) => {
    if(discount.quantity <= item.quantity) {
      maxDiscount = discount.rate;
    }
    return maxDiscount;
  }, 0)
  return maxDiscount;
};

export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null
) => {
  const totalBeforeDiscount = cart.reduce((sum, cur) => sum += cur.product.price * cur.quantity, 0)
  
  const totalDiscount = getTotalDiscount({ cart, coupon: selectedCoupon, totalBeforeDiscount })

  const totalAfterDiscount = totalBeforeDiscount - totalDiscount

  return {
    totalBeforeDiscount,
    totalAfterDiscount,
    totalDiscount,
  };
};

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number
): CartItem[] => {
  return [];
};
