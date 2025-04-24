import { CartItem, Product } from '../../../types';
import ProductListItem from './ProductListItem';

interface ProductListProps {
  productList: Product[];
  cart: CartItem[];
  addToCart: (product: Product) => void;
}

// 상품 목록
const ProductList = ({ productList, cart, addToCart }: ProductListProps) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
      <div className="space-y-2">
        {productList.map((product) => (
          <ProductListItem key={product.id} product={product} cart={cart} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
