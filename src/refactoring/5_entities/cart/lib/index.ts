import { CartItem, CartTotal, Discount } from "../../../6_shared/types";

export const addToCart = (
  cart: CartItem[],
  product: CartItem["product"]
): CartItem[] => {
  return [...cart, { product, quantity: 1 }];
};

export const removeFromCart = (
  cart: CartItem[],
  productId: CartItem["product"]["id"]
): CartItem[] => {
  return cart.filter((cartItem) => cartItem.product.id !== productId);
};

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: CartItem["product"]["id"],
  newQuantity: CartItem["quantity"]
): CartItem[] => {
  return cart.map((cartItem) => {
    if (cartItem.product.id === productId) {
      return {
        ...cartItem,
        quantity: newQuantity,
      };
    }

    return cartItem;
  });
};

export const findCartItem = (
  cart: CartItem[],
  productId: CartItem["product"]["id"]
) => {
  return cart.find((cartItem) => cartItem.product.id === productId);
};

const isDiscountApplicable = (cartItem: CartItem, discount: Discount) => {
  return cartItem.quantity >= discount.quantity;
};

const calculateItemBeforeDiscount = (cartItem: CartItem) => {
  return cartItem.quantity * cartItem.product.price;
};

const calculateItemDiscount = (originalPrice: number, discountRate: number) => {
  return originalPrice * discountRate;
};

const calculateItemAfterDiscount = (
  originalPrice: number,
  discountAmount: number
) => {
  return originalPrice - discountAmount;
};

export const calculateMaxApplicableDiscount = (cartItem: CartItem) => {
  return cartItem.product.discounts.reduce((maxDiscountRate, discount) => {
    if (discount.rate <= maxDiscountRate) return maxDiscountRate;
    if (!isDiscountApplicable(cartItem, discount)) return maxDiscountRate;

    return discount.rate;
  }, 0);
};

export const calculateCartTotal = (cart: CartItem[]): CartTotal => {
  return cart.reduce(
    (cartTotal, cartItem) => {
      // 할인 전 총액
      const itemBeforeDiscount = calculateItemBeforeDiscount(cartItem);

      // 적용 가능한 최대 할인율
      const maxDiscountRate = calculateMaxApplicableDiscount(cartItem);

      // 할인 금액
      const itemDiscountAmount = calculateItemDiscount(
        itemBeforeDiscount,
        maxDiscountRate
      );

      // 할인 후 금액
      const itemAfterDiscount = calculateItemAfterDiscount(
        itemBeforeDiscount,
        itemDiscountAmount
      );

      return {
        totalBeforeDiscount: cartTotal.totalBeforeDiscount + itemBeforeDiscount,
        totalAfterDiscount: cartTotal.totalAfterDiscount + itemAfterDiscount,
        totalDiscount: cartTotal.totalDiscount + itemDiscountAmount,
      };
    },
    {
      totalBeforeDiscount: 0,
      totalAfterDiscount: 0,
      totalDiscount: 0,
    }
  );
};
