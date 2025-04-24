// useCart.ts
import { useState } from "react";
import { CartItem, Coupon, Product } from "../../types";
import { calculateCartTotal, updateCartItemQuantity } from "./utils/cartUtils";

export const useCart = () => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

    const addToCart = (product: Product) => {
        // setCart((prev) => {...prev, product})
        // setCart((prev) => {...prev, product})
        console.log("product: ", product);

        // setCart((prevCart) => [...prevCart, { product, quantity: 1 }]);

        // 현재 장바구니에 동일한 상품이 있는지 확인
        const existingItemIndex = cart.findIndex(
            (item) => item.product.id === product.id
        );

        // 동일 항목이 있으면 장바구니 수량 증가
        if (existingItemIndex >= 0) {
            setCart((prevCart) => {
                const currentQuantity = prevCart[existingItemIndex].quantity;

                if (currentQuantity < product.stock) {
                    return prevCart.map((item, index) =>
                        index === existingItemIndex
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    );
                }
                // 재고 한도에 도달한 경우 변경 없음
                return prevCart;
            });
        } else {
            // 장바구니에 없는 경우 새 항목 추가
            if (product.stock > 0) {
                setCart((prevCart) => [...prevCart, { product, quantity: 1 }]);
            }
        }
    };

    const removeFromCart = (productId: string) => {
        console.log("removeFromCart");
        console.log("productId: ", productId);

        setCart((prevCart) =>
            prevCart.filter((item) => item.product.id !== productId)
        );
    };

    // 제품 수량 업데이트
    const updateQuantity = (productId: string, newQuantity: number) => {
        setCart((prevCart) =>
            updateCartItemQuantity(prevCart, productId, newQuantity)
        );
    };

    const applyCoupon = (coupon: Coupon) => {
        setSelectedCoupon(coupon);
    };

    // const calculateTotal = () => ({
    //     totalBeforeDiscount: 0,
    //     totalAfterDiscount: 0,
    //     totalDiscount: 0,
    // });
    const calculateTotal = () => {
        // 미리 구현해둔 calculateCartTotal 유틸리티 함수 사용
        return calculateCartTotal(cart, selectedCoupon);
    };

    return {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        applyCoupon,
        calculateTotal,
        selectedCoupon,
    };
};
