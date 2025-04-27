import { ProductCard } from '.';
import { CartItem, Product } from '../../../../types';

type ProductLsitProps = {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product) => void;
};

export const ProductListSection = ({ products, cart, addToCart }: ProductLsitProps) => {
  return (
    <div>
      <div className="space-y-2">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} cart={cart} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};
