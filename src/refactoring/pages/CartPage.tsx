import { useState } from 'react';
import { CartItem, Coupon, Product } from '../../types.ts';
import { CartItemList } from '../components/cart/CartItemList.tsx';
import { CouponApplySection } from '../components/coupon/CouponApplySection.tsx';
import { OrderSummary } from '../components/order/OrderSummary.tsx';
import { ProductItemList } from '../components/product/ProductItemList.tsx';

interface Props {
  products: Product[];
  coupons: Coupon[];
}

export const CartPage = ({ products, coupons }: Props) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon , setSelectedCoupon] = useState<Coupon | null>(null);
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* products가 드릴링 된다고 볼 수 있을듯 */}
        <ProductItemList products={products} cart={cart} setCart={setCart} />
        <div>
          <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
          <CartItemList cart={cart} setCart={setCart}/>
          {/* 쿠폰도 역시 동일! */}
          <CouponApplySection coupons={coupons} selectedCoupon={selectedCoupon} setSelectedCoupon={setSelectedCoupon}/>
          <OrderSummary cart={cart} selectedCoupon={selectedCoupon} />
        </div>
      </div>
    </div>
  );
};
