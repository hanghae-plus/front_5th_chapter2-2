import { Product } from "../../types.ts";
import { useCart } from "../hooks/index.ts";
import { ItemAddCartButton } from "./ItemAddCartButton.tsx";
import { ItemDiscountInfo } from "./ItemDiscountInfo.tsx";
import { ItemNamePrice } from "./ItemNamePrice.tsx";

interface Props {
  products: Product[];
}

// 왼쪽 '상품 목록' 영역
export const ItemList = ({ products }: Props) => {
  const { cart, addToCart } = useCart();

  const getRemainingStock = (product: Product) => {
    const cartItem = cart.find((item) => item.product.id === product.id);
    return product.stock - (cartItem?.quantity || 0);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
      <div className="space-y-2">
        {products.map((product) => {
          const remainingStock = getRemainingStock(product);

          return (
            <div
              key={product.id}
              data-testid={`product-${product.id}`}
              className="bg-white p-3 rounded shadow"
            >
              <ItemNamePrice product={product} />
              <ItemDiscountInfo
                product={product}
                remainingStock={remainingStock}
              />
              <ItemAddCartButton
                product={product}
                remainingStock={remainingStock}
                addToCart={addToCart}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
