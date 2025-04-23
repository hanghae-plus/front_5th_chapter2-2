import { CartItem, Coupon } from "../../../types";

// 기본가격 + 할인율 계산
export const calculateItemTotal = (item: CartItem) => {
    // 기본 가격 계산 (가격 * 수량)
    const baseTotal = item.product.price * item.quantity;

    // 할인율
    const maxDiscount = getMaxApplicableDiscount(item);

    // 할인 적용하여 최종 가격 계산
    const discountedTotal = baseTotal * (1 - maxDiscount);

    return discountedTotal;
};

// 적용 가능한 최대 할인값
// 순수함수 분리
export const getMaxApplicationDiscountRate = (item: CartItem) => {
    // 적용 가능한 최대 할인율 찾기
    let maxRate = 0;

    for (const discount of item.product.discounts) {
        // 현재 수량이 할인 적용 기준 수량 이상인 경우
        if (item.quantity >= discount.quantity) {
            // 더 높은 할인율을 찾으면 업데이트
            if (discount.rate > maxRate) {
                maxRate = discount.rate;
            }
        }
    }
    return maxRate;
};

// 할인 전 총액 계산
// 순수함수 분리
export const getTotalBeforeDiscount = (cart: CartItem[]) => {
    return cart.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
    );
};
// 상품별 할인이 적용된 금액 계산 (각 상품의 할인 적용 가격의 합)
// 순수함수 분리
export const getItemsDiscountedTotal = (cart: CartItem[]) => {
    return cart.reduce((total, item) => total + calculateItemTotal(item), 0);
};

// 쿠폰 할인 적용
export const getApplyCouponDiscount = (
    totalAmount: number,
    coupon: Coupon | null
) => {
    if (!coupon) return totalAmount;
    let discountedTotal = totalAmount;

    if (coupon.discountType === "amount") {
        discountedTotal = Math.max(0, discountedTotal - coupon.discountValue);
    } else if (coupon.discountType === "percentage") {
        discountedTotal = discountedTotal * (1 - coupon.discountValue / 100);
    }

    return discountedTotal;
};
// 총 할인 금액 계산
export const calculateTotalDiscount = (
    beforeDiscount: number,
    afterDiscount: number
) => {
    return beforeDiscount - afterDiscount;
};

// 적용 가능한 최대 할인
export const getMaxApplicableDiscount = (item: CartItem) => {
    // 할인 정책이 없거나 비어있으면 0 반환
    if (!item.product.discounts || item.product.discounts.length === 0) {
        return 0;
    }
    return getMaxApplicationDiscountRate(item);
};

// 장바구니의 총 금액을 계산
export const calculateCartTotal = (
    cart: CartItem[],
    selectedCoupon: Coupon | null
) => {
    // 기본 가격 계산 (가격 * 수량)
    // const baseTotal = item.product.price * item.quantity;
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

// 재고 한도를 초과하지 않도록 제한
export const getLimitedQuantity = (
    requestedQuantity: number,
    stockQuantity: number
): number => {
    return Math.min(requestedQuantity, stockQuantity);
};

// 수량 업데이트
export const updateCartItemQuantity = (
    cart: CartItem[],
    productId: string,
    newQuantity: number
): CartItem[] => {
    if (newQuantity === 0) {
        return cart.filter((item) => item.product.id !== productId);
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
