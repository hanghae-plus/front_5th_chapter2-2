import { CartItem } from '../../../../types';
import { Product } from '../../../../types';
import { getRemainingStock } from '../../../models/cart';
import { ProductItem } from './ProductItem';

export const ProductSection = ({
  addToCart,
  cart,
  products
}: {
  addToCart: (product: Product) => void;
  cart: CartItem[];
  products: Product[];
}) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
      <div className="space-y-2">
        {products.map(product => {
          const remainingStock = getRemainingStock(cart, product);
          return (
            <ProductItem
              key={product.id}
              product={product}
              remainingStock={remainingStock}
              addToCart={addToCart}
            />
          );
        })}
      </div>
    </div>
  );
};
