import { ProductCardWithAdd } from './ProductCardWithAdd';
import type { CartItem, Product } from '@/types';

interface CartProductListProps {
  cart: CartItem[];
  products: Product[];
  addToCart: (product: Product) => void;
}

export const CartProductList = ({
  cart,
  products,
  addToCart,
}: CartProductListProps) => {
  const getRemainingStock = (cart: CartItem[], product: Product) => {
    const cartItem = cart.find((item) => item.product.id === product.id);
    return product.stock - (cartItem?.quantity || 0);
  };

  return (
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
  );
};
