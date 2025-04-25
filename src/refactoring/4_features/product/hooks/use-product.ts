import { useCart } from "../../../4_features/cart/hooks";
import {
  getMaxDiscount,
  getRemainingStock,
} from "../../../5_entities/product/lib";
import { findCartItem } from "../../../5_entities/cart/lib";
import { Product } from "../../../6_shared/types";

// 장바구니 페이지 - [상품 재고], [최대 할인]
export const useProduct = (product: Product) => {
  const { cart } = useCart();

  const cartItem = findCartItem(cart, product.id);

  // 상품재고
  const remainingStock = getRemainingStock(product, cartItem);

  // 최대 할인
  const maxDiscount = getMaxDiscount(product.discounts);

  return {
    remainingStock,
    maxDiscount,
  };
};
