import { CartItem, Product } from "../../../types";

//계산
export const getMaxDiscount = (discounts: { quantity: number; rate: number }[]) => {
    return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
};

//계산
export const getRemainingStock = (cart: CartItem[], product: Product) => {
    const cartItem = cart.find(item => item.product.id === product.id);
    // console.log("장바구니 아이템", cartItem);
    return product.stock - (cartItem?.quantity || 0);
};

// 계산
export const getAppliedDiscount = (item: CartItem) => {
    const { discounts } = item.product;
    const { quantity } = item;
    let appliedDiscount = 0;

    discounts.forEach(discount => {
        if (quantity >= discount.quantity) {
            appliedDiscount = Math.max(appliedDiscount, discount.rate);
        }
    })

    return appliedDiscount;
};

export const calculateItemTotal = (item: CartItem) => {
    const { quantity, product } = item;
    const total = product.price * quantity;
    if (product.discounts) {
        const applicableDiscount = product.discounts
            .filter(d => quantity >= d.quantity)
            .sort((a, b) => b.rate - a.rate)[0]; // 가장 높은 할인율 선택

        if (applicableDiscount) {
            const discountAmount = total * applicableDiscount.rate;
            return total - discountAmount;
        }
    }
    return total;
};
