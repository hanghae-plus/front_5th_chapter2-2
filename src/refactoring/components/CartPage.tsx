import { useState } from 'react';
import { Coupon, Product } from '../../types.ts';
import { useCart, useProductSearch } from "../hooks";
import ProductCard from './ProductCard.tsx';
import CartItemRow from './CartItemRow.tsx';
import SummaryBox from './SummaryBox.tsx';
import CouponSelectBox from './CouponSelectBox.tsx';
import InputField from './InputField.tsx';


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
    selectedCoupon
  } = useCart();

  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } = calculateTotal()

  const [serchValue, setSearchValue] = useState<string>('');

  const filteredProducts = useProductSearch(products, serchValue);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
          <div className="space-y-2">
            <InputField
              searchValue={serchValue}
              setSearchValue={setSearchValue}
              placeholder='상품 검색'
            />
            {filteredProducts.map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                  cart={cart}
                />
              );
            })}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>

          <div className="space-y-2">
            {cart.map(item => {
              return (
                <CartItemRow
                  key={item.product.id}
                  item={item}
                  updateQuantity={updateQuantity}
                  removeFromCart={removeFromCart}
                />
              );
            })}
          </div>

          <CouponSelectBox
            applyCoupon={applyCoupon}
            coupons={coupons}
            selectedCoupon={selectedCoupon}
          />

          <SummaryBox
            totalBeforeDiscount={totalBeforeDiscount}
            totalAfterDiscount={totalAfterDiscount}
            totalDiscount={totalDiscount}
          />
        </div>
      </div>
    </div>
  );
};
