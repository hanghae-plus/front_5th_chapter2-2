import { createContext, useState, useContext, ReactNode } from "react";
import { CartItem, Coupon, Product } from "../../types";
import {
	addItemToCart,
	calculateCartTotal,
	getRemainingStock,
	updateCartItemQuantity,
} from "../models/cart";

interface CartContextType {
	cart: CartItem[];
	selectedCoupon: Coupon | null;
	addToCart: (product: Product) => void;
	removeFromCart: (productId: string) => void;
	updateQuantity: (productId: string, newQuantity: number) => void;
	applyCoupon: (coupon: Coupon) => void;
	calculateTotal: () => {
		totalBeforeDiscount: number;
		totalAfterDiscount: number;
		totalDiscount: number;
	};
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
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

	return (
		<CartContext.Provider
			value={{
				cart,
				selectedCoupon,
				addToCart,
				removeFromCart,
				updateQuantity,
				applyCoupon,
				calculateTotal,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

export function useCart() {
	const context = useContext(CartContext);

	if (context === undefined) {
		throw new Error("useCartContext must be used within a CartProvider");
	}

	return context;
}
