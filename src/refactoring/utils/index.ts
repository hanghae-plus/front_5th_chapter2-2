import { CartItem, Discount } from "../../types";

export const filterdDiscount = (item: CartItem) => {
  return item.product.discounts.filter((discount) => {
    return item.quantity >= discount.quantity;
  });
};

export const getMaxDiscountRate = (discountArray: Discount[]) => {
  return discountArray.length > 0
    ? Math.max(...discountArray.map((discount) => discount.rate))
    : 0;
};
