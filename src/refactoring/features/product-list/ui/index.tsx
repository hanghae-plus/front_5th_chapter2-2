import { Product } from "@r/entities/product";
import { CartItem } from "@r/entities/cart";

import { ProductCard } from "./product-card";

interface ProductListProps {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  cart,
  addToCart,
}) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
      <div className="space-y-2">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            cart={cart}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
};
