import ProductListItem from './ProductListItem';
import type { Product } from '../../../../types';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  getRemainingStock: (product: Product) => number;
}

const ProductList = (props: ProductListProps) => {
  const { products, onAddToCart, getRemainingStock } = props;

  return (
    <div className="space-y-2">
      {products.map((product) => {
        return (
          <ProductListItem
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            remainingStock={getRemainingStock(product)}
          />
        );
      })}
    </div>
  );
};

export default ProductList;
