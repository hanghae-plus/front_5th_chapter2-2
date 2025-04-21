// useCart.ts
import { useState } from "react";
import { CartItem, Coupon, Product } from "../../types";
import {
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

		setCart((prevCart) => {
			const existingItem = prevCart.find(
				(item) => item.product.id === product.id
			);

			if (!existingItem) return [...prevCart, { product, quantity: 1 }];

			return prevCart.map((item) =>
				item.product.id === product.id
					? {
							...item,
							quantity: Math.min(item.quantity + 1, product.stock),
					  }
					: item
			);
		});
	};

	const removeFromCart = (productId: string) => {
		setCart((prevCart) =>
			prevCart.filter((cartItem) => cartItem.product.id !== productId)
		);
	};

	const updateQuantity = (productId: string, newQuantity: number) => {
		setCart((prevCart) =>
			updateCartItemQuantity(prevCart, productId, newQuantity)
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
