// useCart.ts
import { useState } from "react";
import { CartItem, Coupon, Product } from "../../types";
import {
	addItemToCart,
	calculateCartTotal,
	getRemainingStock,
	updateCartItemQuantity,
} from "../models/cart";

export const useCart = () => {
	const [cart, setCart] = useState<CartItem[]>([]);
	const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

	const addToCart = (product: Product) => {
		const remainingStock = getRemainingStock(cart, product);

		if (remainingStock <= 0) return;

		setCart((prevCart) => addItemToCart(prevCart, product));
	};

	const removeFromCart = (productId: string) => {
		setCart((prevCart) =>
			prevCart.filter((cartItem) => cartItem.product.id !== productId),
		);
	};

	const updateQuantity = (productId: string, newQuantity: number) => {
		setCart((prevCart) =>
			updateCartItemQuantity(prevCart, productId, newQuantity),
		);
	};

	const applyCoupon = (coupon: Coupon) => {
		setSelectedCoupon(coupon);
	};

	const calculateTotal = () => calculateCartTotal(cart, selectedCoupon);

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
