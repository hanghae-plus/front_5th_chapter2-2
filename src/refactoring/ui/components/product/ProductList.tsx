import { Product, CartItem } from "../../../../types";
import { ProductCard } from "./ProductCard";
import { ProductListHeader } from "./ProductListHeader";

interface ProductListProps {
  products: Product[];
  cart: CartItem[];
  onAddToCart: (product: Product) => void;
}

export const ProductList = ({ products, cart, onAddToCart }: ProductListProps) => {
  return (
    <div>
      <ProductListHeader />
      <div className="space-y-2">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            cart={cart}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
};
