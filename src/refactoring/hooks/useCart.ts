// useCart.ts
import { useState } from 'react';
import { CartItem, Coupon, Discount, Product } from '../../types';
import {
    addNewCartItem,
    calculateCartTotal,
    getAppliedDiscount,
    getMaxDiscount,
    getRemainingStock,
    updateCartItemQuantity,
} from '../models/cart';

export const useCart = () => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

    const addToCart = (product: Product) => {
        const hasStock = product.stock > 0;
        if (!hasStock) return;

        const cartItem = cart.find((item) => item.product.id === product.id);
        if (cartItem) {
            const addedQuantity = cartItem.quantity + 1;
            const newCart = updateCartItemQuantity(cart, product.id, addedQuantity);
            setCart(newCart);
        } else {
            const newCart = addNewCartItem(cart, product);
            setCart(newCart);
        }
    };

    const removeFromCart = (productId: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
    };

    const updateQuantity = (productId: string, newQuantity: number) => {
        setCart((prevCart) => updateCartItemQuantity(prevCart, productId, newQuantity));
    };

    const applyCoupon = (coupon: Coupon) => {
        setSelectedCoupon(coupon);
    };

    const calculateTotal = () => {
        return calculateCartTotal(cart, selectedCoupon);
    };

    const calculateMaxDiscount = (discounts: Discount[]) => {
        return getMaxDiscount(discounts);
    };

    const calculateRemainingStock = (product: Product) => {
        return getRemainingStock(cart, product);
    };

    const calculateDiscount = (item: CartItem) => {
        return getAppliedDiscount(item);
    };

    return {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        applyCoupon,
        calculateTotal,
        calculateMaxDiscount,
        calculateRemainingStock,
        calculateDiscount,
        selectedCoupon,
    };
};
