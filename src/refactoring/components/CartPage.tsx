import { CartItem, Coupon, Product } from "../../types.ts";
import { useCart } from "../hooks";
import CartItemList from "./CartItemList.tsx";
import ProductList from "./ProductList.tsx";
import CouponSelector from "./CouponSelector.tsx";
import OrderSummary from "./OrderSummary.tsx";

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

    // const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } =
    //     calculateTotal();
    const totals = calculateTotal();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">장바구니</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <ProductList
                        products={products}
                        cart={cart}
                        onAddToCart={addToCart}
                    />
                </div>
                <div>
                    <CartItemList
                        items={cart}
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeFromCart}
                    />
                    <CouponSelector
                        coupons={coupons}
                        selectedCoupon={selectedCoupon}
                        onApply={applyCoupon}
                    />

                    <OrderSummary totals={totals} />
                </div>
            </div>
        </div>
    );
};
