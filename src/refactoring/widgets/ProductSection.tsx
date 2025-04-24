import { Product } from '../entities';
import { ProductItem } from '../features/cart';
import { useProductContext } from '../shared';

interface ProductSectionProps {
  getRemainingStock: (product: Product) => number;
  addToCart: (product: Product) => void;
}

export const ProductSection = ({
  getRemainingStock,
  addToCart,
}: ProductSectionProps) => {
  const { products } = useProductContext();

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
