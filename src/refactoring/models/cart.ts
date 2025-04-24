import { CartItem, Coupon, Product } from "../../types";

export const calculateItemTotal = (item: CartItem) => {

  const maxDiscount = item.product.discounts.reduce((max, discount) => {
    
    //만일 아이템 수량>할인 조건 충족 수량이라면 새로운 할인률을 업데이트 한다.
    return item.quantity >= discount.quantity ? Math.max(max, discount.rate) : max;
  
  }, 0);

  return item.product.price * item.quantity * (1-maxDiscount);
};


export const getMaxApplicableDiscount = (item: CartItem) => {

  return item.product.discounts.reduce((max, discount) => {
    return item.quantity >= discount.quantity ? Math.max(max, discount.rate) : max;
  }, 0);
};


export const getItemRemoveFromCart = (prevCart: CartItem[], productId: string) => {
  return prevCart.filter(item => item.product.id !== productId);
}


export const getAddToCart = (prevCart: CartItem[], product: Product) => {
  const existingItem = prevCart.find(item => item.product.id === product.id);
  if (existingItem) {
    return prevCart.map(item =>
      item.product.id === product.id
        ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
        : item
    );
  }

  return [...prevCart, { product, quantity: 1 }];
}


export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null
) => {
  const totalBeforeDiscount = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  let totalAfterDiscount = cart.reduce((total, item) => total + calculateItemTotal(item) ,0);

  // 쿠폰 적용
  if (selectedCoupon) {
    if (selectedCoupon.discountType === 'amount') {
      totalAfterDiscount -= selectedCoupon.discountValue;
    } else {
      totalAfterDiscount *= (1 - selectedCoupon.discountValue / 100);
    }
  }

  const totalDiscount = totalBeforeDiscount - totalAfterDiscount;

  return {
    totalBeforeDiscount,
    totalAfterDiscount,
    totalDiscount
  };
};


export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number
): CartItem[] => {

  //newQuantity가 0 이하면 해당 상품을 리스트에서 제거 
  if(newQuantity <= 0 ){
    return cart.filter((item) => item.product.id !== productId);
  }

  return cart.map(item => {
    if (item.product.id === productId) {
      const maxQuantity = item.product.stock;
      const updatedQuantity = Math.min(newQuantity, maxQuantity);
      return { ...item, quantity: updatedQuantity };
    }
    return item;
  })
};
