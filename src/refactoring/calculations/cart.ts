import { CartItem, Coupon, Product } from "../../types";

export const getMaxDiscount = (
  discounts: { quantity: number; rate: number }[]
) => {
  return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
};

export const getRemainingStock = (cart: CartItem[], product: Product) => {
  const cartItem = cart.find((item) => item.product.id === product.id);
  return product.stock - (cartItem?.quantity || 0);
};

export const getAppliedDiscount = (item: CartItem) => {
  const { discounts } = item.product;
  const { quantity } = item;
  let appliedDiscount = 0;
  for (const discount of discounts) {
    if (quantity >= discount.quantity) {
      appliedDiscount = Math.max(appliedDiscount, discount.rate);
    }
  }
  return appliedDiscount;
};

export const calculateItemTotal = (item: CartItem) => {
  const { product, quantity } = item;
  const { price } = product;
  const total = price * quantity;
  const maxDiscount = getMaxApplicableDiscount(item);
  const discount = total * maxDiscount;
  return total - discount;
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  const { product, quantity } = item;
  const { discounts } = product;
  const maxDiscount = discounts.reduce((acc, discount) => {
    if (quantity >= discount.quantity) return discount.rate;
    return acc;
  }, 0);
  return maxDiscount;
};

const getCouponDiscount = (
  selectedCoupon: Coupon | null,
  totalBeforeDiscount: number
) => {
  if (!selectedCoupon) return 0;
  if (selectedCoupon.discountType === "amount") {
    return selectedCoupon.discountValue;
  }
  return totalBeforeDiscount * (selectedCoupon.discountValue / 100);
};

export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null
) => {
  const totalBeforeDiscount = cart.reduce((acc, item) => {
    const { product, quantity } = item;
    const { price } = product;
    const total = price * quantity;
    return acc + total;
  }, 0);

  const totalAfterDiscountBeforeCoupon = cart.reduce((acc, item) => {
    const total = calculateItemTotal(item);
    return acc + total;
  }, 0);

  const totalAfterDiscount =
    totalAfterDiscountBeforeCoupon -
    getCouponDiscount(selectedCoupon, totalAfterDiscountBeforeCoupon);

  const totalDiscount = totalBeforeDiscount - totalAfterDiscount;

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
  const product = cart.find((item) => item.product.id === productId)!.product;

  const updatedCart = cart.map((item) => {
    if (item.product.id === productId) {
      if (newQuantity === 0) {
        return null;
      }
      if (newQuantity > product.stock) {
        return { ...item, quantity: product.stock };
      }
      return { ...item, quantity: newQuantity };
    }
    return item;
  });

  return updatedCart.filter((item) => item !== null);
};
