import { CartItem, Coupon } from "../../types";

export const calculateItemTotal = (item: CartItem) => {
  const { price } = item.product;
  const { quantity } = item;

  const discount = getMaxApplicableDiscount(item);

  return price * quantity * (1 - discount);
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  return item.product.discounts.reduce((maxDiscount, d) => {
    return item.quantity >= d.quantity && d.rate > maxDiscount
      ? d.rate
      : maxDiscount;
  }, 0);
};

export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null
) => {
  const totalBeforeDiscount = cart.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  const totalAfterProductDiscount = cart.reduce((acc, item) => {
    return acc + calculateItemTotal(item);
  }, 0);

  const afterCouponDiscount = (discount: number) => {
    if (!selectedCoupon) return discount;

    if (selectedCoupon.discountType === "amount") {
      return Math.max(0, discount - selectedCoupon.discountValue);
    } else {
      return discount * (1 - selectedCoupon.discountValue / 100);
    }
  };

  const totalAfterDiscount = afterCouponDiscount(totalAfterProductDiscount);

  const totalDiscount = totalBeforeDiscount - totalAfterDiscount;

  return {
    totalBeforeDiscount: Math.round(totalBeforeDiscount),
    totalAfterDiscount: Math.round(totalAfterDiscount),
    totalDiscount: Math.round(totalDiscount),
  };
};

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number
): CartItem[] => {
  return cart
    .map((item) => {
      if (item.product.id === productId) {
        const maxQuantity = item.product.stock;
        const updatedQuantity = Math.max(0, Math.min(newQuantity, maxQuantity));
        return updatedQuantity > 0
          ? { ...item, quantity: updatedQuantity }
          : null;
      }
      return item;
    })
    .filter((item): item is CartItem => item !== null);
};
