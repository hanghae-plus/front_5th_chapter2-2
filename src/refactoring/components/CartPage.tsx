import { Coupon, Product } from "../../types.ts";
import ProductList from "./product/ProductList.tsx";
import CartPageLayout from "./cart/CartPageLayout.tsx";
import Cart from "./cart/Cart.tsx";

interface Props {
  products: Product[];
  coupons: Coupon[];
}

export const CartPage = ({ products, coupons }: Props) => {
  return (
    <CartPageLayout>
      {/* 상품 목록 */}
      <ProductList products={products} />
      {/* 장바구니 내역 */}
      <Cart coupons={coupons} />
    </CartPageLayout>
  );
};
