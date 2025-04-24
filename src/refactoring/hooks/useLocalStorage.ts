import { useState } from "react";
import { CartItem } from "../../types";

export const useLocalStorage = () => {
    const [localCart, setLocalCart] = useState<CartItem[]>(() => {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
    });

    const setValue = (value: CartItem[]) => {
        localStorage.setItem("cart", JSON.stringify(value));
        setLocalCart(value)
    }

    const removeValue = () => {
        console.log("장바구니 삭제");
        setLocalCart([]);
        localStorage.removeItem("cart");
    }

    return {
        localCart,
        setValue,
        removeValue,
    }

}