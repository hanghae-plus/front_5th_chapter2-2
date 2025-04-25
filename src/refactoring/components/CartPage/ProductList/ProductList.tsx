import { useProducts } from '../../../hooks';
import { ProductCard } from './ProductCard.tsx';

export function ProductList() {
  const { products } = useProducts();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>

      <div className="space-y-2">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
