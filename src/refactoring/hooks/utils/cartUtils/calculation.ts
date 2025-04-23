import { CartItem } from "../../../../types";
import { calculateItemTotal } from "./product";
// calculateItemTotal

// 할인 전 총액 계산
// 순수함수 분리 (calculation)
export const getTotalBeforeDiscount = (cart: CartItem[]) => {
    return cart.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
    );
};

// 상품별 할인이 적용된 금액 계산 (각 상품의 할인 적용 가격의 합)
// 순수함수 분리 (calculation)
export const getItemsDiscountedTotal = (cart: CartItem[]) => {
    return cart.reduce((total, item) => total + calculateItemTotal(item), 0);
};

// 총 할인 금액 계산
// 순수(calculation)
export const calculateTotalDiscount = (
    beforeDiscount: number,
    afterDiscount: number
) => {
    return beforeDiscount - afterDiscount;
};

export const getCartRemoveItem = (cart: CartItem[], productId: string) => {
    return cart.filter((item) => item.product.id !== productId);
};
