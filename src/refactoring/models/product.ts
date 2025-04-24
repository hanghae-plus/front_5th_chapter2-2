import { CartItem, Product } from "../../types";

export const getMaxApplicableDiscount = (item: CartItem) => {
  const applicableRates = item.product.discounts
    .filter((rule) => item.quantity >= rule.quantity)
    .map((rule) => rule.rate);

  const maxDiscountRate = Math.max(0, ...applicableRates);

  return maxDiscountRate;
};

export const getAppliedDiscount = (item: CartItem) => {
  const { discounts } = item.product;
  const { quantity } = item;

  return discounts
    .filter((discount) => quantity >= discount.quantity)
    .reduce((maxRate, discount) => Math.max(maxRate, discount.rate), 0);
};

export const getRemainingStock = (cart: CartItem[], product: Product) => {
  const cartItem = cart.find((item) => item.product.id === product.id);
  return product.stock - (cartItem?.quantity || 0);
};
