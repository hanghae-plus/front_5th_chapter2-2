import { Coupon, Product } from "../../types.ts";
import { useCart } from "../hooks";
import {
  CartItemCardList,
  ProductCardList,
  CouponSection,
  OrderSummary,
} from "../components/cart";
import { PageLayout, SectionLayout } from "../components/common";

interface Props {
  products: Product[];
  coupons: Coupon[];
}

export const CartPage = ({ products, coupons }: Props) => {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
  } = useCart();

  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } =
    calculateTotal();

  return (
    <PageLayout title="장바구니">
      <SectionLayout title="상품 목록">
        <ProductCardList
          products={products}
          cart={cart}
          onAddToCart={addToCart}
        />
      </SectionLayout>
      <SectionLayout title="장바구니 내역">
        <CartItemCardList
          cart={cart}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
        />

        <CouponSection
          coupons={coupons}
          selectedCoupon={selectedCoupon}
          onApplyCoupon={applyCoupon}
        />

        <OrderSummary
          totalBeforeDiscount={totalBeforeDiscount}
          totalDiscount={totalDiscount}
          totalAfterDiscount={totalAfterDiscount}
        />
      </SectionLayout>
    </PageLayout>
  );
};
