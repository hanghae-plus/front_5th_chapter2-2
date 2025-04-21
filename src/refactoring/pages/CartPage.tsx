import { CartItem, Coupon, Product } from "../../types.ts";
import { useCart } from "../hooks";
import {
  ProductCard,
  CouponSection,
  OrderSummary,
  CartItemCard,
} from "../components/cart";
import { PageLayout, SectionLayout } from "../components/common";
import {
  getMaxDiscount,
  getRemainingStock,
  getAppliedDiscount,
} from "../calculations/cart";
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
        <div className="space-y-2">
          {products.map((product) => {
            const remainingStock = getRemainingStock(cart, product);
            return (
              <ProductCard
                key={product.id}
                product={product}
                remainingStock={remainingStock}
                onAddToCart={addToCart}
                getMaxDiscount={getMaxDiscount}
              />
            );
          })}
        </div>
      </SectionLayout>
      <SectionLayout title="장바구니 내역">
        <div className="space-y-2">
          {cart.map((item) => {
            const appliedDiscount = getAppliedDiscount(item);
            return (
              <CartItemCard
                key={item.product.id}
                item={item}
                appliedDiscount={appliedDiscount}
                onUpdateQuantity={updateQuantity}
                onRemoveFromCart={removeFromCart}
              />
            );
          })}
        </div>

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
