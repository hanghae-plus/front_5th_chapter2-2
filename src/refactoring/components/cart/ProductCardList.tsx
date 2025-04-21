import { Product, CartItem } from "../../../types";
import { ProductCard } from "./ProductCard";
import { getRemainingStock, getMaxDiscount } from "../../calculations/cart";

interface ProductCardListProps {
  products: Product[];
  cart: CartItem[];
  onAddToCart: (product: Product) => void;
}

export const ProductCardList = ({
  products,
  cart,
  onAddToCart,
}: ProductCardListProps) => {
  return (
    <div className="space-y-2">
      {products.map((product) => {
        const remainingStock = getRemainingStock(cart, product);
        return (
          <ProductCard
            key={product.id}
            product={product}
            remainingStock={remainingStock}
            onAddToCart={onAddToCart}
            getMaxDiscount={getMaxDiscount}
          />
        );
      })}
    </div>
  );
};
