import { Product, CartItem } from "../../../../types";
import { getRemainingStock } from "../../../functions/cartFunctions";
import { AddToCartButton } from "./AddToCartButton";
import { ProductDiscountList } from "./ProductDiscountList";
import { ProductInfo } from "./ProductInfo";

interface ProductCardProps {
  product: Product;
  cart: CartItem[];
  onAddToCart: (product: Product) => void;
}

export const ProductCard = ({ product, cart, onAddToCart }: ProductCardProps) => {
  const remainingStock = getRemainingStock(product, cart);
  
  return (
    <div data-testid={`product-${product.id}`} className="bg-white p-3 rounded shadow">
      <ProductInfo 
        product={product} 
        remainingStock={remainingStock} 
      />
      
      <ProductDiscountList discounts={product.discounts} />
      
      <AddToCartButton 
        product={product} 
        remainingStock={remainingStock} 
        onAddToCart={onAddToCart} 
      />
    </div>
  );
}; 