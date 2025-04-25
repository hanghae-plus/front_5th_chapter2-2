import { useAdmin } from '../../../../hooks';
import { ProductItem } from './ProductItem.tsx';

export function ProductList() {
  const { products } = useAdmin();

  return (
    <div className="space-y-2">
      {products.map((product, index) => (
        <ProductItem product={product} index={index} key={product.id} />
      ))}
    </div>
  );
}
