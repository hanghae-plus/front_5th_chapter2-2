import {Coupon, Product} from '../../types.ts';
import {useCart} from "../hooks";
import {ProductList} from "./ProductList.tsx";
import {CartSummary} from "./CartSummary.tsx";

interface Props {
  products: Product[];
  coupons: Coupon[];
}

export const CartPage = ({products, coupons}: Props) => {
  const {
    cart,
    selectedCoupon,
    addToCart,
    removeFromCart,
    updateQuantity,
    getProductRemainingStock,
    getItemAppliedDiscount,
    getMaxDiscount,
    applyCoupon,
    calculateTotal,
  } = useCart();

  const {totalBeforeDiscount, totalAfterDiscount, totalDiscount} = calculateTotal();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductList
          products={products}
          addToCart={addToCart}
          getProductRemainingStock={getProductRemainingStock}
          getMaxDiscount={getMaxDiscount}
        />
        <CartSummary
          cart={cart}
          coupons={coupons}
          selectedCoupon={selectedCoupon}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          applyCoupon={applyCoupon}
          getItemAppliedDiscount={getItemAppliedDiscount}
          totalBeforeDiscount={totalBeforeDiscount}
          totalAfterDiscount={totalAfterDiscount}
          totalDiscount={totalDiscount}
        />
      </div>
    </div>
  );
};
