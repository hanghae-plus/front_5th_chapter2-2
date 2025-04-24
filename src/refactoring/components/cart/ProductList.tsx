import { Product, CartItem } from '../../types';
import { SectionTitle } from '../layout/SectionTitle.tsx';
import { getRemainingStock } from '../../utils/product.ts';
import { ProductCard } from './ProductCard.tsx';

interface Props {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product) => void;
}

export const ProductList = ({ products, cart, addToCart }: Props) => {
  return (
    <div>
      <SectionTitle sectionTitle={'상품 목록'} />
      <div className="space-y-2">
        {products.map(product => {
          const remainingStock = getRemainingStock(product, cart);
          return (
            <ProductCard
              key={product.id}
              product={product}
              remainingStock={remainingStock}
              onAddToCart={addToCart}
            ></ProductCard>
          );
        })}
      </div>
    </div>
  );
};
