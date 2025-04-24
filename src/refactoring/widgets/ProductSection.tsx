import { Product } from '../entities';
import { ProductItem, useCartContext } from '../features/cart';

import { useProductContext } from '../shared';

interface ProductSectionProps {}

export const ProductSection = ({}: ProductSectionProps) => {
  const { products } = useProductContext();
  const { addToCart, cart } = useCartContext();

  const getRemainingStock = (product: Product) => {
    const cartItem = cart.find((item) => item.product.id === product.id);
    return product.stock - (cartItem?.quantity || 0);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
      <div className="space-y-2">
        {products.map((product) => {
          const remainingStock = getRemainingStock(product);
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
