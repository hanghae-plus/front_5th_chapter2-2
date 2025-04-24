import { useMemo } from 'react';
import { Coupon, Product } from '../../../types';
import { useCart } from '../../hooks';
import Select from '../common/Select';
import { CartProductItem } from './CartProductItem';
import { ProductItem } from './ProductItem';
import { isAmountDiscount } from '../../lib';

interface CartPageProps {
  products: Product[];
  coupons: Coupon[];
}

export const CartPage = ({ products, coupons }: CartPageProps) => {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
  } = useCart();

  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } = calculateTotal();

  const selectValue = useMemo(() => {
    if (!selectedCoupon) return '';

    return coupons.findIndex((c) => c.code === selectedCoupon.code).toString();
  }, [selectedCoupon, coupons]);

  const couponOptions = useMemo(() => {
    const defaultOption = { value: '', label: '쿠폰 선택' };

    return [
      defaultOption,
      ...coupons.map(({ name, discountType, discountValue }, index) => ({
        value: index.toString(),
        label: `${name} - ${isAmountDiscount(discountType) ? `${discountValue}원` : `${discountValue}%`}`,
      })),
    ];
  }, [coupons]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
          <div className="space-y-2">
            {products.map((product) => (
              <ProductItem key={product.id} product={product} cart={cart} addToCart={addToCart} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>

          <div className="space-y-2">
            {cart.map((item) => (
              <CartProductItem
                key={item.product.id}
                item={item}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
              />
            ))}
          </div>

          <div className="mt-6 bg-white p-4 rounded shadow">
            <h2 className="text-2xl font-semibold mb-2">쿠폰 적용</h2>
            <Select
              value={selectValue}
              options={couponOptions}
              onChange={(value) => applyCoupon(coupons[parseInt(value)])}
              className="mb-2"
              placeholder="쿠폰 선택"
            />

            {selectedCoupon && (
              <p className="text-green-600">
                {`적용된 쿠폰: ${selectedCoupon.name}(
                ${
                  isAmountDiscount(selectedCoupon.discountType)
                    ? `${selectedCoupon.discountValue}원`
                    : `${selectedCoupon.discountValue}%`
                }
                할인)`}
              </p>
            )}
          </div>

          <div className="mt-6 bg-white p-4 rounded shadow">
            <h2 className="text-2xl font-semibold mb-2">주문 요약</h2>
            <div className="space-y-1">
              <p>상품 금액: {totalBeforeDiscount.toLocaleString()}원</p>
              <p className="text-green-600">할인 금액: {totalDiscount.toLocaleString()}원</p>
              <p className="text-xl font-bold">
                최종 결제 금액: {totalAfterDiscount.toLocaleString()}원
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
