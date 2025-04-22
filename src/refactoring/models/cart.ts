import { CartItem, Coupon, Discount, Product } from "../../types";

export const getRemainingStock = (cart: CartItem[], product: Product) => {
	const cartItem = cart.find((item) => item.product.id === product.id);

	const remainingStock = product.stock - (cartItem?.quantity || 0);
	return remainingStock;
};

export const calculateItemTotal = (item: CartItem) => {
	const {
		quantity,
		product: { price, discounts },
	} = item;

	const discount = discounts.reduce((maxDiscount, d) => {
		return quantity >= d.quantity && d.rate > maxDiscount
			? d.rate
			: maxDiscount;
	}, 0);

	const itemTotalAfterDiscount = price * quantity * (1 - discount);
	return itemTotalAfterDiscount;
};

export const getMaxApplicableDiscount = (item: CartItem) => {
	const {
		quantity,
		product: { discounts },
	} = item;

	const appliedDiscount = discounts.reduce((maxDiscount, discount) => {
		if (quantity < discount.quantity) return maxDiscount;

		return Math.max(maxDiscount, discount.rate);
	}, 0);
	return appliedDiscount;
};

export const getMaxDiscount = (discounts: Discount[]) => {
	return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
};

export const calculateCartTotal = (
	cart: CartItem[],
	selectedCoupon: Coupon | null,
) => {
	let totalBeforeDiscount = 0;
	let totalAfterDiscount = 0;

	cart.forEach((item) => {
		const {
			quantity,
			product: { price },
		} = item;

		const itemTotalAfterDiscount = calculateItemTotal(item);

		totalBeforeDiscount += price * quantity;
		totalAfterDiscount += itemTotalAfterDiscount;
	});

	let totalDiscount = totalBeforeDiscount - totalAfterDiscount;

	// 쿠폰 적용
	if (selectedCoupon) {
		if (selectedCoupon.discountType === "amount") {
			totalAfterDiscount = Math.max(
				0,
				totalAfterDiscount - selectedCoupon.discountValue,
			);
		} else {
			totalAfterDiscount *= 1 - selectedCoupon.discountValue / 100;
		}
		totalDiscount = totalBeforeDiscount - totalAfterDiscount;
	}

	return {
		totalBeforeDiscount: Math.round(totalBeforeDiscount),
		totalAfterDiscount: Math.round(totalAfterDiscount),
		totalDiscount: Math.round(totalDiscount),
	};
};

export const updateCartItemQuantity = (
	cart: CartItem[],
	productId: string,
	newQuantity: number,
): CartItem[] => {
	const updatedCart = cart
		.map((item) => {
			const { id, stock } = item.product;

			if (id !== productId) return item;

			const maxQuantity = stock;
			const updatedQuantity = Math.max(0, Math.min(newQuantity, maxQuantity));

			return updatedQuantity > 0
				? { ...item, quantity: updatedQuantity }
				: null;
		})
		.filter((item): item is CartItem => item !== null);

	return updatedCart;
};
