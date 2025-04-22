import { getRemainingStock } from "@/refactoring/calculations/cart/calc-item";
import { CartItem, Product } from "@/refactoring/entities";

/**
 * 장바구니에 상품을 추가
 *
 * @param cart - 현재 장바구니 배열
 * @param product - 추가할 상품
 * @returns 새로운 장바구니 배열
 */
const addToCart = (cart: CartItem[], product: Product): CartItem[] => {
  const remainingStock = getRemainingStock(product, cart);
  if (remainingStock <= 0) return cart;

  const existingItem = cart.find((item) => item.product.id === product.id);
  if (existingItem) {
    return cart.map((item) =>
      item.product.id === product.id
        ? {
            ...item,
            quantity: Math.min(item.quantity + 1, product.stock),
          }
        : item,
    );
  }
  return [...cart, { product, quantity: 1 }];
};

/**
 * 장바구니에서 상품을 제거
 * @param cart - 현재 장바구니 배열
 * @param productId - 제거할 상품 ID
 * @returns 필터링된 새로운 장바구니 배열
 */
const removeFromCart = (cart: CartItem[], productId: string): CartItem[] => {
  return cart.filter((item) => item.product.id !== productId);
};

/**
 * 장바구니에서 특정 상품의 수량을 업데이트
 *
 * @param cart - 현재 장바구니 배열
 * @param productId - 변경할 상품 ID
 * @param newQuantity - 새로운 수량
 * @returns 수량이 적용된 새로운 장바구니 배열
 */
const updateQuantity = (cart: CartItem[], productId: string, newQuantity: number): CartItem[] => {
  return cart
    .map((item) => {
      if (item.product.id === productId) {
        const maxQuantity = item.product.stock;
        const adjustedQuantity = Math.max(0, Math.min(newQuantity, maxQuantity));
        return adjustedQuantity > 0 ? { ...item, quantity: adjustedQuantity } : null;
      }
      return item;
    })
    .filter((item): item is CartItem => item !== null);
};

export { addToCart, removeFromCart, updateQuantity };
