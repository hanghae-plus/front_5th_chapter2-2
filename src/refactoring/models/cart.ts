import { CartItem, Coupon, Product } from "../../types";
import { filterdDiscount, getMaxDiscountRate } from "../utils";

/**
 * calculateItemTotal
 * @description 아이템의 수량과 할인율을 적용하여 총 가격을 구합니다.
 */
export const calculateItemTotal = (item: CartItem) => {
  const discountArray = filterdDiscount(item);

  const discountRate = getMaxDiscountRate(discountArray);

  const totalItemPrice = discountRate
    ? item.product.price * item.quantity * (1 - discountRate)
    : item.product.price * item.quantity;

  return totalItemPrice;
};

/**
 * getMaxApplicableDiscount
 * @description 아이템중에서 가장 큰 할인율을 구합니다.
 */
export const getMaxApplicableDiscount = (item: CartItem) => {
  const discountArray = filterdDiscount(item);

  const discountRate = getMaxDiscountRate(discountArray);

  return discountRate ? discountRate : 0;
};

/**
 * getCouponDiscountAmount
 * @description 쿠폰을 적용한 가격을 구하기
 */
export const getCouponDiscountAmount = (coupon: Coupon, price: number) => {
  if (coupon.discountType === "amount") {
    return price - coupon.discountValue;
  }
  if (coupon.discountType === "percentage") {
    return price * (1 - coupon.discountValue / 100);
  }
  return price;
};

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

export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null
) => {
  if (!selectedCoupon) {
    const totalBeforeDiscount = cart.reduce((acc, cur) => {
      return acc + cur.product.price * cur.quantity;
    }, 0);

    const totalAfterDiscount = cart.reduce((acc, cur) => {
      return acc + calculateItemTotal(cur);
    }, 0);

    return {
      totalBeforeDiscount: totalBeforeDiscount,
      totalAfterDiscount: totalAfterDiscount,
      totalDiscount: totalBeforeDiscount - totalAfterDiscount,
    };
  }

  if (selectedCoupon) {
    const totalBeforeDiscount = cart.reduce((acc, cur) => {
      return acc + cur.product.price * cur.quantity;
    }, 0);

    const totalAfterDiscount = cart.reduce((acc, cur) => {
      return acc + calculateItemTotal(cur);
    }, 0);

    const couponDiscountAmount = getCouponDiscountAmount(
      selectedCoupon,
      totalAfterDiscount
    );

    return {
      totalBeforeDiscount: totalBeforeDiscount,
      totalAfterDiscount: couponDiscountAmount,
      totalDiscount: totalBeforeDiscount - couponDiscountAmount,
    };
  }

  return {
    totalBeforeDiscount: 10,
    totalAfterDiscount: 20,
    totalDiscount: 30,
  };
};

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number
): CartItem[] => {
  if (newQuantity === 0) {
    return cart.filter((item) => item.product.id !== productId);
  }

  const updatedCart = cart.map((item) => {
    if (item.product.id === productId) {
      return {
        ...item,
        quantity:
          newQuantity > item.product.stock ? item.product.stock : newQuantity,
      };
    }
    return item;
  });

  return updatedCart;
};
