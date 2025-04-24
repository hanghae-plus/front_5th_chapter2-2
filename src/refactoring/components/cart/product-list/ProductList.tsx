import { CartItem, Product } from "../../../../types.ts";
import { ProductItemCard } from "./ProductItemCard.tsx";

interface Props {
  products: Product[];
  addToCart: (product: Product) => void;
  getCartItem: (id: string) => CartItem | undefined;
}

export const ProductList = ({ products, addToCart, getCartItem }: Props) => {
  const getRemainingStock = (product: Product) => {
    const cartItemQuantity = getCartItem(product.id)?.quantity ?? 0;

    return product.stock - cartItemQuantity;
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
      <div className="space-y-2">
        {products.map((product) => (
          <ProductItemCard
            key={product.id}
            product={product}
            addToCart={addToCart}
            remainingStock={getRemainingStock(product)}
          />
        ))}
      </div>
    </div>
  );
};
