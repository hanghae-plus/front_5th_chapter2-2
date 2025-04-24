import { CartItem as CartItemType, Coupon, Product } from "../../types.ts";
import { useCart } from "../hooks";
import ProductList from "../components/ProductList.tsx";
import ApplyCoupon from "../components/ApplyCoupon.tsx";
import OrderSummary from "../components/OrderSummary.tsx";
import CartItem from "../components/CartItem.tsx";

interface Props {
  products: Product[];
  coupons: Coupon[];
}

export const CartPage = ({ products, coupons }: Props) => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    addToCart,
    calculateTotal,
    applyCoupon,
    selectedCoupon,
  } = useCart();

  const getAppliedDiscount = (item: CartItemType) => {
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
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <ProductList
            products={products}
            cartItems={cart}
            onAddToCart={addToCart}
          />
          <div className="space-y-2">
            {cart.map((item) => (
              <CartItem
                key={item.product.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
                getAppliedDiscount={getAppliedDiscount}
              />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
          <ApplyCoupon
            coupons={coupons}
            onApplyCoupon={applyCoupon}
            selectedCoupon={selectedCoupon}
          />
          <OrderSummary cartTotal={calculateTotal()} />
        </div>
      </div>
    </div>
  );
};
