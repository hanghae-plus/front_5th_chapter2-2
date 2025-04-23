import ProductListItem from './ProductListItem';
import type { Product } from '../../types';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  getRemainingStock: (product: Product) => number;
}

const ProductList = (props: ProductListProps) => {
  const { products, onAddToCart, getRemainingStock } = props;

  return (
    <>
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
    </>
  );
};

export default ProductList;
