import { Coupon, Product } from '../../types.ts';
import { ApplyCoupon, useCart } from '../hooks';
import { Products } from './Cart/components/Products';
import { CartDisplay } from './Cart/components/CartDisplay';

import { Summary } from './Cart/components/Summary';
import { ApplyCouponToCart } from './Cart/components/ApplyCouponToCart';
import { useState } from 'react';

interface Props {
  products: Product[];
  coupons: Coupon[];
}

export const CartPage = ({ products, coupons }: Props) => {
  const { cart, addToCart, removeFromCart, updateQuantity, getRemainingStock } =
    useCart();

  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const applyCoupon: ApplyCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
  };

  const calculateTotal = () => {
    let totalBeforeDiscount = 0;
    let totalAfterDiscount = 0;

    cart.forEach((item) => {
      const { price } = item.product;

      const { quantity } = item;
      totalBeforeDiscount += price * quantity;

      const discount = item.product.discounts.reduce((maxDiscount, d) => {
        return quantity >= d.quantity && d.rate > maxDiscount
          ? d.rate
          : maxDiscount;
      }, 0);
      totalAfterDiscount += price * quantity * (1 - discount);
    });

    let totalDiscount = totalBeforeDiscount - totalAfterDiscount;

    if (selectedCoupon) {
      if (selectedCoupon.discountType === 'amount') {
        totalAfterDiscount = Math.max(
          0,
          totalAfterDiscount - selectedCoupon.discountValue,
        );
      } else {
        totalAfterDiscount *= 1 - selectedCoupon.discountValue / 100;
      }
      totalDiscount = totalBeforeDiscount - totalAfterDiscount;
    }

    return {
      totalBeforeDiscount: Math.round(totalBeforeDiscount),
      totalAfterDiscount: Math.round(totalAfterDiscount),
      totalDiscount: Math.round(totalDiscount),
    };
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6'>장바구니</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <Products
          products={products}
          addToCart={addToCart}
          getRemainingStock={getRemainingStock}
        />
        <div id={'장바구니 내역'}>
          <CartDisplay
            cart={cart}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
          />
          <ApplyCouponToCart
            coupons={coupons}
            applyCoupon={applyCoupon}
            selectedCoupon={selectedCoupon}
          />

          <Summary calculateTotal={calculateTotal} />
        </div>
      </div>
    </div>
  );
};
