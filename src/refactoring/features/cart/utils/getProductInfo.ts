import { CartItem, Product } from "@/types";
import { calculateRemainingStock } from "./calculateRemainingStock";

export const getProductInfo = (product: Product, cart: CartItem[]) => ({
  remainingStock: calculateRemainingStock(product, cart),
  isOutOfStock: calculateRemainingStock(product, cart) <= 0
});
