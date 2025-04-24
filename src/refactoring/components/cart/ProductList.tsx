import ProductCard from "./ProductCard.tsx"
import { Cart, Product } from "../../../types.ts"
import { useProductContext } from "../../context/ProductContext.tsx"

export default function ProductList({ cart, addToCart }: { cart: Cart; addToCart: (product: Product) => void }) {
  const { products } = useProductContext()
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
      <div className="space-y-2">
        {products.map((product) => (
          <ProductCard product={product} cart={cart} key={product.id} addToCart={addToCart} />
        ))}
      </div>
    </div>
  )
}
