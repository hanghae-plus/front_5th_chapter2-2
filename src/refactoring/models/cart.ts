import { CartItem, Coupon } from "../../types";

export const calculateItemTotal = (item: CartItem) => {
  const targetDiscount = item.product.discounts.reduce((finalDiscount, discount) => {
    if (item.quantity >= discount.quantity && discount.quantity > finalDiscount.quantity) {
      return discount;
    }
    return finalDiscount;
  }, { rate: 0, quantity: 0 });

  return item.product.price * item.quantity * (1 - targetDiscount.rate);
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  const targetDiscountRate = item.product.discounts.reduce((finalRate, discount) => {
    if (item.quantity >= discount.quantity && discount.rate > finalRate) {
      return discount.rate;
    }
    return finalRate;
  }, 0)

  return targetDiscountRate;
};

const calculateCouponDiscount = (amount: number, coupon: Coupon | null) => {
  if (!coupon) return amount;

  if (coupon.discountType === 'amount') {
    return amount - coupon.discountValue;
  }

  return amount * (1 - (coupon.discountValue / 100));
}

export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null
) => {
  let totalBeforeDiscount = 0;
  let totalAfterDiscount = 0;

  cart.forEach((cartItem) => {
    const itemAmountBeforeDiscount = (cartItem.product.price * cartItem.quantity);
    const itemAmountAfterDiscount = calculateItemTotal(cartItem);

    totalBeforeDiscount += itemAmountBeforeDiscount;
    totalAfterDiscount += itemAmountAfterDiscount;
  })

  totalAfterDiscount = calculateCouponDiscount(totalAfterDiscount, selectedCoupon);

  return {
    totalBeforeDiscount,
    totalAfterDiscount,
    totalDiscount: totalBeforeDiscount - totalAfterDiscount,
  };
};

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number
): CartItem[] => {
  if (!newQuantity) {
    return cart.filter((cartItem) => cartItem.product.id !== productId);
  }

  const newCart = cart.map((cartItem)=> {
    if (cartItem.product.id === productId) {
      return {
        ...cartItem,
        quantity: cartItem.product.stock > newQuantity ? newQuantity : cartItem.product.stock,
      }
    }
    return cartItem
  })
  return newCart;
};
