import { CartItem, Coupon, Product } from "../../types.ts";
import { useCart } from "../hooks";
import {
  ProductCard,
  CouponSection,
  OrderSummary,
  CartItemCard,
} from "../components/cart";
import { Typography } from "../components/common";

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

  const getMaxDiscount = (discounts: { quantity: number; rate: number }[]) => {
    return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
  };

  const getRemainingStock = (product: Product) => {
    const cartItem = cart.find((item) => item.product.id === product.id);
    return product.stock - (cartItem?.quantity || 0);
  };

  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } =
    calculateTotal();

  const getAppliedDiscount = (item: CartItem) => {
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

  return (
    <div className="container mx-auto p-4">
      <Typography variant="h1">장바구니</Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Typography variant="h2">상품 목록</Typography>
          <div className="space-y-2">
            {products.map((product) => {
              const remainingStock = getRemainingStock(product);
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
        </div>
        <div>
          <Typography variant="h2">장바구니 내역</Typography>

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
        </div>
      </div>
    </div>
  );
};
