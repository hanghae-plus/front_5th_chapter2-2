import { CartItem, Product } from "../../../../types";
import { ProductItemBox } from "./ProductItem";

interface Props {
  products: Product[];
  cart: CartItem[];
  onAddToCart: (product: Product) => void;
}




export const ProductList = ({products, cart, onAddToCart}: Props) => {

  const getRemainingStock = (product: Product) => {
    const cartItem = cart.find(item => item.product.id === product.id);
    
    return product.stock - (cartItem?.quantity || 0);
  };


  return(
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
      <div className="space-y-2">

        {products.map(product => {
          return (<ProductItemBox 
                    key={product.id} 
                    product = {product}
                    remainingStock = {getRemainingStock(product)}
                    onAddToCart={onAddToCart}
                  />)
        })}
      </div>
    </div>
  )
}