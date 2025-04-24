import { CartItem, Coupon, Discount, Product } from '../../types';

export const calculateItemTotal = (item: CartItem) => {
    const discountRate = getMaxApplicableDiscount(item);

    return item.product.price * item.quantity * (1 - discountRate);
};

export const getMaxApplicableDiscount = (item: CartItem) => {
    const dicounts = item.product.discounts.sort((a, b) => b.quantity - a.quantity); // 오름차순
    const discountRate = dicounts.find((dicount) => dicount.quantity <= item.quantity)?.rate || 0;

    return discountRate;
};

export const calculateCartTotal = (cart: CartItem[], selectedCoupon: Coupon | null) => {
    /** 개수 할인이 적용되지 않은 단순 총합 금액입니다. */
    const totalNoDuscount = cart.reduce((prev, curr) => prev + curr.product.price * curr.quantity, 0);
    /** 개수 할인이 적용된 총합 금액입니다. */
    const totalQuantityDiscount = cart.reduce((prev, curr) => prev + calculateItemTotal(curr), 0);

    if (!selectedCoupon) {
        return {
            totalBeforeDiscount: totalNoDuscount,
            totalAfterDiscount: totalQuantityDiscount,
            totalDiscount: totalNoDuscount - totalQuantityDiscount,
        };
    }

    /** 개수 할인이 적용된 금액에 대해 쿠폰을 적용한 총합 금액입니다. */
    const totalCouponDiscount =
        selectedCoupon?.discountType === 'amount'
            ? totalQuantityDiscount - selectedCoupon.discountValue
            : totalQuantityDiscount * ((100 - selectedCoupon.discountValue) / 100);

    const totalDiscount = totalNoDuscount - totalCouponDiscount;

    return {
        totalBeforeDiscount: totalNoDuscount,
        totalAfterDiscount: totalCouponDiscount,
        totalDiscount,
    };
};

/** cart에 없는 item을 추가합니다. */
export const addNewCartItem = (cart: CartItem[], product: Product) => {
    const newCartItem = {
        product,
        quantity: 1,
    } as CartItem;

    return [...cart, newCartItem];
};

/** cart에 이미 존재하는 item에 대해 quantity를 업데이트 합니다. */
export const updateCartItemQuantity = (cart: CartItem[], productId: string, newQuantity: number): CartItem[] => {
    // 1. quantity가 0이면 cart에서 제거
    if (newQuantity === 0) {
        return cart.filter((item) => item.product.id !== productId);
    }

    // 2. quantity 변경
    const newCart = cart.map((item) => {
        // TODO: 재고 max 핸들링
        if (item.product.id === productId) {
            const isAvailableToAdd = newQuantity < item.product.stock;

            return {
                ...item,
                quantity: isAvailableToAdd ? newQuantity : item.product.stock,
            };
        }
        return item;
    });

    return newCart;
};

export const getMaxDiscount = (discounts: Discount[]) => {
    return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
};

export const getRemainingStock = (cart: CartItem[], product: Product) => {
    const cartItem = cart.find((item) => item.product.id === product.id);
    return product.stock - (cartItem?.quantity || 0);
};

export const getAppliedDiscount = (item: CartItem) => {
    const { discounts } = item.product;
    const { quantity } = item;
    let appliedDiscount = 0;
    for (const discount of discounts) {
        if (quantity >= discount.quantity) {
            appliedDiscount = Math.max(appliedDiscount, discount.rate);
        }
    }
    return appliedDiscount;
};
