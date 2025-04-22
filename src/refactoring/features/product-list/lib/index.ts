import { Product } from "@r/entities/product";
import { CartItem } from "@r/entities/cart";

export const getRemainingStock = (product: Product, cart: CartItem[]) => {
  const cartItem = cart.find((item) => item.product.id === product.id);
  return product.stock - (cartItem?.quantity || 0);
};
