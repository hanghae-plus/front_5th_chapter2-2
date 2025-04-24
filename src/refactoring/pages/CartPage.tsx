import { CartItemCard, ProductCardWithAdd } from '../components/cart';
import { CouponSelect } from '../components/coupon';
import { useCart } from '../hooks';
import type { CartItem, Coupon, Product } from '../../types.ts';

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

  const getRemainingStock = (cart: CartItem[], product: Product) => {
    const cartItem = cart.find((item) => item.product.id === product.id);
    return product.stock - (cartItem?.quantity || 0);
  };

  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } =
    calculateTotal();

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6'>장바구니</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
          <h2 className='text-2xl font-semibold mb-4'>상품 목록</h2>
          <div className='space-y-2'>
            {products.map((product) => {
              const remainingStock = getRemainingStock(cart, product);
              return (
                <ProductCardWithAdd
                  key={`cart-item-card-${product.id}`}
                  remainingStock={remainingStock}
                  product={product}
                  addToCart={addToCart}
                />
              );
            })}
          </div>
        </div>
        <div>
          <h2 className='text-2xl font-semibold mb-4'>장바구니 내역</h2>

          <div className='space-y-2'>
            {cart.map((item) => (
              <CartItemCard
                key={`cart-item-card-${item.product.id}`}
                item={item}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
              />
            ))}
          </div>

          <CouponSelect
            coupons={coupons}
            applyCoupon={applyCoupon}
            selectedCoupon={selectedCoupon}
          />

          <div className='mt-6 bg-white p-4 rounded shadow'>
            <h2 className='text-2xl font-semibold mb-2'>주문 요약</h2>
            <div className='space-y-1'>
              <p>상품 금액: {totalBeforeDiscount.toLocaleString()}원</p>
              <p className='text-green-600'>
                할인 금액: {totalDiscount.toLocaleString()}원
              </p>
              <p className='text-xl font-bold'>
                최종 결제 금액: {totalAfterDiscount.toLocaleString()}원
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
