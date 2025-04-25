import { useAtom, useAtomValue } from "jotai";

import { cartAtom, cartTotalAtom } from "../../../5_entities/cart/model";
import * as CartModel from "../../../5_entities/cart/lib";
import { Product } from "../../../6_shared/types";

// 장바구니 페이지 - 장바구니 내역
export const useCart = () => {
  const [cart, setCart] = useAtom(cartAtom);
  const cartTotal = useAtomValue(cartTotalAtom);

  const addToCart = (product: Product) => {
    // 재고가 없으면 카트에 추가하지 않음
    if (product.stock <= 0) return;

    // 기존 상품 조회
    const existingItem = CartModel.findCartItem(cart, product.id);

    if (existingItem) {
      // 기존 상품이면 수량 증가
      const updatedCart = CartModel.updateCartItemQuantity(
        cart,
        product.id,
        existingItem.quantity + 1
      );
      setCart(updatedCart);
    } else {
      // 새 상품 추가
      const updatedCart = CartModel.addToCart(cart, product);
      setCart(updatedCart);
    }
  };

  const removeFromCart = (product: Product) => {
    const updatedCart = CartModel.removeFromCart(cart, product.id);
    setCart(updatedCart);
  };

  const updateQuantity = (product: Product, newQuantity: number) => {
    const existingItem = CartModel.findCartItem(cart, product.id);

    // 존재하지 않는 상품이면 early return
    if (!existingItem) return;

    // 수량이 0 이하면 상품 제거
    if (newQuantity <= 0) {
      const updatedCart = CartModel.removeFromCart(cart, product.id);
      setCart(updatedCart);
      return;
    }

    // 수량 업데이트
    const updatedCart = CartModel.updateCartItemQuantity(
      cart,
      product.id,
      Math.min(newQuantity, product.stock)
    );
    setCart(updatedCart);
  };

  return {
    cart,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    getAppliedDiscount: CartModel.calculateMaxApplicableDiscount,
  };
};
