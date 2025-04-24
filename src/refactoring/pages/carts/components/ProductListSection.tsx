import { ProductCard } from '.';
import { CartItem, Product } from '../../../../types';
import { SectionTitle } from '../../../components';

type ProductLsitProps = {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product) => void;
  getRemainingStock: (args: { cart: CartItem[]; product: Product }) => number;
  getMaxDiscount: (discounts: { quantity: number; rate: number }[]) => number;
};

export const ProductListSection = ({
  products,
  cart,
  addToCart,
  getRemainingStock,
  getMaxDiscount,
}: ProductLsitProps) => {
  return (
    <div>
      <SectionTitle>상품 목록</SectionTitle>
      <div className="space-y-2">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            cart={cart}
            addToCart={addToCart}
            getRemainingStock={getRemainingStock}
            getMaxDiscount={getMaxDiscount}
          />
        ))}
      </div>
    </div>
  );
};
