// 모든 순수 함수 내보내기
export * from "./product";
export * from "./coupon";
export * from "./calculation";

// 액션 함수들 직접 구현
import { CartItem, Coupon } from "./../../../../types";
import { getTotalBeforeDiscount, getItemsDiscountedTotal } from "./calculation";
import { getApplyCouponDiscount } from "./coupon";
import { calculateTotalDiscount, getCartRemoveItem } from "./calculation";
import { getLimitedQuantity } from "./product";

// 장바구니의 총 금액을 계산
// 액션
export const calculateCartTotal = (
    cart: CartItem[],
    selectedCoupon: Coupon | null
) => {
    // 기본 가격 계산 (가격 * 수량)
    // 할인 전 총액 계산 (모든 상품의 기본 가격 * 수량의 합)
    const totalBeforeDiscount = getTotalBeforeDiscount(cart);

    // 상품별 할인이 적용된 금액 계산 (각 상품의 할인 적용 가격의 합)
    const itemsDiscountedTotal = getItemsDiscountedTotal(cart);

    console.log("totalBeforeDiscount: ", totalBeforeDiscount);
    console.log("itemsDiscountedTotal: ", itemsDiscountedTotal);

    // 쿠폰 할인 적용
    const finalTotal = getApplyCouponDiscount(
        itemsDiscountedTotal,
        selectedCoupon
    );
    // 총 할인 금액 계산
    const totalDiscount = calculateTotalDiscount(
        totalBeforeDiscount,
        finalTotal
    );

    return {
        totalBeforeDiscount,
        totalAfterDiscount: finalTotal,
        totalDiscount: totalDiscount,
    };
};

// 수량 업데이트
// 액션
export const updateCartItemQuantity = (
    cart: CartItem[],
    productId: string,
    newQuantity: number
): CartItem[] => {
    if (newQuantity === 0) {
        return getCartRemoveItem(cart, productId);
    }
    // 수량 업데이트
    return cart.map((item) => {
        // 해당 상품이 아니면 그대로 반환
        if (item.product.id !== productId) {
            return item;
        }

        const maxQuantity = item.product.stock;
        const limitedQuantity = getLimitedQuantity(newQuantity, maxQuantity); // Math.min(newQuantity, maxQuantity);

        // 새 수량으로 업데이트된 항목 반환
        return {
            ...item,
            quantity: limitedQuantity,
        };
    });

    // return [];
};
