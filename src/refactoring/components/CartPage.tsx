import { Coupon, Product } from '../../types.ts';
import { useCart } from '../hooks';
import CartCoupon from './cart/CartCoupon.tsx';
import CartList from './cart/CartLitst.tsx';
import CartOrderSummary from './cart/CartOrderSummary.tsx';
import ProductList from './cart/ProductList.tsx';
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

  const getRemainingStock = (product: Product) => {
    const cartItem = cart.find((item) => item.product.id === product.id);
    return product.stock - (cartItem?.quantity || 0);
  };

  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } =
    calculateTotal();

  const handleChangeQuantity = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
  };

  const handleClickRemove = (productId: string) => {
    removeFromCart(productId);
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6'>장바구니</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <ProductList
          products={products}
          getRemainingStock={getRemainingStock}
          addToCart={addToCart}
        />
        <div>
          <CartList
            cart={cart}
            handleChangeQuantity={handleChangeQuantity}
            handleClickRemove={handleClickRemove}
          />

          <CartCoupon
            coupons={coupons}
            applyCoupon={applyCoupon}
            selectedCoupon={selectedCoupon}
          />

          <CartOrderSummary
            totalBeforeDiscount={totalBeforeDiscount}
            totalDiscount={totalDiscount}
            totalAfterDiscount={totalAfterDiscount}
          />
        </div>
      </div>
    </div>
  );
};
