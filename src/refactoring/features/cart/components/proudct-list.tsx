import { CartItem, Product } from '../../shared/types/entities';
import { ProductCard } from './product-card';

interface ProductListProps {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product) => void;
}

export const ProductList = ({ products, cart, addToCart }: ProductListProps) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
      <div className="space-y-2">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} cart={cart} onAddToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};
