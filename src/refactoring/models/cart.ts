import { CartItem, Coupon } from "../../types";

export const calculateItemTotal = (item: CartItem) => {
  return item.product.price * item.quantity * (1 - getMaxApplicableDiscount(item));
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  const applicableDiscounts = item.product.discounts.filter((discount) => discount.quantity <= item.quantity);
  return applicableDiscounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
};

export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null
) => {

  let totalBeforeDiscount = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  let totalAfterDiscount = cart.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  let totalDiscount = totalBeforeDiscount - totalAfterDiscount;
  if(selectedCoupon) {
    if(selectedCoupon.discountType === 'amount') {
      totalAfterDiscount = Math.max(0, totalAfterDiscount - selectedCoupon.discountValue);
    } else {
      totalAfterDiscount *= (1 - selectedCoupon.discountValue / 100);
    }
    totalDiscount = totalBeforeDiscount - totalAfterDiscount;

  }
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

  const updatedCart = cart.map((item)=> {
    if (item.product.id === productId) {
      const maxQuantity = item.product.stock;
      const updatedQuantity = Math.max(0, Math.min(newQuantity, maxQuantity));
      return updatedQuantity > 0 ? { ...item, quantity: updatedQuantity } : null;
    }
    return item;
  }).filter((item): item is CartItem => item !== null);

  return updatedCart;
};
