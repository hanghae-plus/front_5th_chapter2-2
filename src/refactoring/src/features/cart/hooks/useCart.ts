import { useEffect, useState } from "react";
import { CartItem } from "../../../entities/cart/types";
import { calculateCartTotal } from "../../../entities/cart/utils";
import { Coupon } from "../../../entities/coupon/types";
import { Product } from "../../../entities/product/types";
import { useLocalStorage } from "../../../shared/hooks";
import { useProducts } from "../../products/hooks/useProducts";

export const useCart = () => {
  const [cart, setCart] = useLocalStorage<CartItem[]>("cart", []);
  const [cartState, setCartState] = useState<CartItem[]>(cart);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const { products } = useProducts();

  // cart와 cartState 동기화
  useEffect(() => {
    setCartState([...cart]);
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      if (product.stock <= 0) {
        return prevCart;
      }
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id,
      );
      if (existingItem) {
        const newCart = prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
        // 내부 상태 즉시 업데이트 (옵션)
        setCartState([...newCart]);
        return newCart;
      }
      const newCart = [...prevCart, { product, quantity: 1 }];
      // 내부 상태 즉시 업데이트 (옵션)
      setCartState([...newCart]);
      return newCart;
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => item.product.id !== productId);
      // 내부 상태 즉시 업데이트
      setCartState([...newCart]);
      return newCart;
    });
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart((prevCart) => {
      let newCart;
      if (newQuantity <= 0) {
        newCart = prevCart.filter((item) => item.product.id !== productId);
      } else {
        newCart = prevCart.map((item) => {
          if (item.product.id === productId) {
            const limitedQuantity = Math.min(newQuantity, item.product.stock);
            return { ...item, quantity: limitedQuantity };
          }
          return item;
        });
      }
      // 내부 상태 즉시 업데이트
      setCartState([...newCart]);
      return newCart;
    });
  };

  const applyCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
  };

  const calculateTotal = () => {
    const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } =
      calculateCartTotal(cartState, selectedCoupon);
    return {
      totalBeforeDiscount,
      totalAfterDiscount,
      totalDiscount,
    };
  };

  // 장바구니 상품 유효성 검사 및 정리 함수
  const cleanInvalidCartItems = () => {
    if (cartState.length === 0 || products.length === 0) return;

    // 현재 제품 ID 목록 생성
    const validProductIds = new Set(products.map((product) => product.id));

    // 유효하지 않은 상품 필터링
    const validCartItems = cartState.filter((item) =>
      validProductIds.has(item.product.id),
    );

    // 유효하지 않은 상품이 있으면 장바구니 업데이트
    if (validCartItems.length !== cartState.length) {
      setCart(validCartItems);
      setCartState(validCartItems);
    }
  };

  useEffect(() => {
    cleanInvalidCartItems();
  }, [products]);

  return {
    cart: cartState, // 외부로는 cartState를 노출
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
  };
};
