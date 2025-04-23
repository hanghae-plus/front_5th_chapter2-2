import { CartItem } from "./../../../../types";

// 기본가격 + 할인율 계산
// 순수
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

// 적용 가능한 최대 할인
export const getMaxApplicableDiscount = (item: CartItem) => {
    // 할인 정책이 없거나 비어있으면 0 반환
    if (!item.product.discounts || item.product.discounts.length === 0) {
        return 0;
    }
    return getMaxApplicationDiscountRate(item);
};

// 재고 한도를 초과하지 않도록 제한
// 순수
export const getLimitedQuantity = (
    requestedQuantity: number,
    stockQuantity: number
): number => {
    return Math.min(requestedQuantity, stockQuantity);
};
