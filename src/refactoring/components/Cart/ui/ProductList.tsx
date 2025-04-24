import { Product, CartItem as CartItemInfo } from "../../../../types.ts";
import ProductItem from "./ProductItem";
interface ProductListProps {
  products: Product[];
  cart: CartItemInfo[];
  addToCart: (product: Product) => void;
}

const ProductList = ({ products, cart, addToCart }: ProductListProps) => {
  return (
    <div className="space-y-2">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          cart={cart}
          addToCart={addToCart}
        />
      ))}
    </div>
  );
};

export default ProductList;
