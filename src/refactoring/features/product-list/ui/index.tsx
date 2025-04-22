import { Product, useProductContext } from "@r/entities/product";
import { CartItem } from "@r/entities/cart";

import { ProductCard } from "./product-card";

interface ProductListProps {
  cart: CartItem[];
  addToCart: (product: Product) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  cart,
  addToCart,
}) => {
  const { products } = useProductContext();

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
