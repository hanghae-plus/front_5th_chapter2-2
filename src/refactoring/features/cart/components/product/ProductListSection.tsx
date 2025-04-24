import { CartItem, Product } from '@/types';
import { ProductCard } from './ProductCard';
import { getProductInfo } from '@/features/cart/utils/getProductInfo';

interface Props {
  cart: CartItem[];
  products: Product[];
  addToCart: (product: Product) => void;
}

export const ProductListSection = ({ cart, products, addToCart }: Props) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
      <div className="space-y-2">
        {products.map((product) => {
          const { remainingStock, isOutOfStock } = getProductInfo(product, cart);
          return (
            <ProductCard key={product.id} data-testid={`product-${product.id}`}>
              <ProductCard.Header product={product} />
              <div className="text-sm text-gray-500 mb-2">
                <ProductCard.Stock
                  remainingStock={remainingStock}
                  isOutOfStock={isOutOfStock}
                />
                <ProductCard.MaxDiscountRate discounts={product.discounts} />
              </div>
              <ProductCard.DiscountList discounts={product.discounts} />
              <ProductCard.AddToCartButton
                isOutOfStock={isOutOfStock}
                addToCart={addToCart}
                product={product}
              />
            </ProductCard>
          );
        })}
      </div>
    </div>
  );
};
