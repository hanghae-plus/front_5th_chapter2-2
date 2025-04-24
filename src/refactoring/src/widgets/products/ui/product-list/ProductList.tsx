import { CartItem } from "../../../../entities/cart/types";
import { Product } from "../../../../entities/product/types";
import { ProductView } from "../../../../entities/product/ui/product/ProductView";
import { useProducts } from "../../../../features/products/hooks";
import { ContentBox } from "../../../../shared/ui";

export const ProductList = ({
  cart,
  addToCart,
}: {
  cart: CartItem[];
  addToCart: (product: Product) => void;
}) => {
  const { products } = useProducts();

  const getRemainingStock = (product: Product) => {
    const cartItem = cart.find((item) => item.product.id === product.id);
    return product.stock - (cartItem?.quantity || 0);
  };

  return (
    <ContentBox title="상품 목록">
      <div className="space-y-2">
        {products.map((product) => (
          <ProductView
            key={product.id}
            product={product}
            addToCart={addToCart}
            remainingStock={getRemainingStock(product)}
          />
        ))}
      </div>
    </ContentBox>
  );
};
