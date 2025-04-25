import { CartProvider } from '../../hooks';
import { CartList } from './CartList/CartList.tsx';
import { ProductList } from './ProductList/ProductList.tsx';

export const CartPage = () => {
  return (
    <CartProvider>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">장바구니</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProductList />

          <CartList />
        </div>
      </div>
    </CartProvider>
  );
};
