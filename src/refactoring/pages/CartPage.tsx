import { useCart } from "../hooks/index.ts";
import { useCouponsContext } from '../context/CouponContext.tsx';
import { useProductContext } from '../context/ProductContext.tsx';

import { TotalPrice } from '../components/Customer/Amount/TotalAmount.tsx';
import { CartList } from '../components/Customer/Cart/CartList.tsx';
import { CouponList } from '../components/Customer/Coupon/CouponList.tsx';
import { ProductList } from '../components/Customer/Product/ProductList.tsx';

export const CartPage = () => {
  const { products } = useProductContext();
  const { coupons } = useCouponsContext();

  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
  } = useCart();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <ProductList 
            products = {products} 
            cart = {cart} 
            onAddToCart={addToCart}/>

          <CartList 
            cart = {cart}
            onUpdateQuantity = { updateQuantity }
            onRemoveFromCart = { removeFromCart } />

          <CouponList 
            coupons = { coupons } 
            selectedCoupon={selectedCoupon}
            applyCoupon =  { applyCoupon } />
  
          <TotalPrice 
            onCalculateTotal = { calculateTotal }/>
      </div>
    </div>
  );
};
