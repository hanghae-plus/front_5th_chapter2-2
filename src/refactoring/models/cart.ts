import { CartItem, Coupon } from "../../types";

// 기본가격 + 할인율 계산
export const calculateItemTotal = (item: CartItem) => {
    console.log("item: ", item);
    // 기본 가격 계산 (가격 * 수량)
    const baseTotal = item.product.price * item.quantity;

    // 할인율
    const maxDiscount = getMaxApplicableDiscount(item);

    // 할인 적용하여 최종 가격 계산
    const discountedTotal = baseTotal * (1 - maxDiscount);

    return discountedTotal;
};

// 적용 가능한 최대 할인
export const getMaxApplicableDiscount = (item: CartItem) => {
    // 할인 정책이 없거나 비어있으면 0 반환
    if (!item.product.discounts || item.product.discounts.length === 0) {
        return 0;
    }

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

// 장바구니의 총 금액을 계산
export const calculateCartTotal = (
    cart: CartItem[],
    selectedCoupon: Coupon | null
) => {
    console.log("cart: ", cart);
    console.log("selectedCoupon: ", selectedCoupon);
    // 기본 가격 계산 (가격 * 수량)
    // const baseTotal = item.product.price * item.quantity;
    // 할인 전 총액 계산 (모든 상품의 기본 가격 * 수량의 합)
    const totalBeforeDiscount = cart.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
    );

    // 상품별 할인이 적용된 금액 계산 (각 상품의 할인 적용 가격의 합)
    const itemsDiscountedTotal = cart.reduce(
        (total, item) => total + calculateItemTotal(item),
        0
    );

    console.log("totalBeforeDiscount: ", totalBeforeDiscount);
    console.log("itemsDiscountedTotal: ", itemsDiscountedTotal);

    // 쿠폰 할인 적용
    let finalTotal = itemsDiscountedTotal;
    if (selectedCoupon) {
        if (selectedCoupon.discountType === "amount") {
            // 금액 할인 쿠폰
            finalTotal = Math.max(0, finalTotal - selectedCoupon.discountValue);
        } else if (selectedCoupon.discountType === "percentage") {
            // 퍼센트 할인 쿠폰
            finalTotal = finalTotal * (1 - selectedCoupon.discountValue / 100);
        }
    }

    // 총 할인 금액 계산
    const totalDiscount = totalBeforeDiscount - finalTotal;

    let aa = [1, 2, 3, 4, 5];
    const sum = aa.reduce((total, item) => total + item);
    console.log(sum);

    return {
        totalBeforeDiscount,
        totalAfterDiscount: finalTotal,
        totalDiscount: totalDiscount,
    };
};

//
export const updateCartItemQuantity = (
    cart: CartItem[],
    productId: string,
    newQuantity: number
): CartItem[] => {
    return [];
};
