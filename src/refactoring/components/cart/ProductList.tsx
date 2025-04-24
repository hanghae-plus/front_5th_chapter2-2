import ProductCard from "./ProductCard.tsx"
import { Cart } from "../../../types.ts"
import { useProductContext } from "../../context/ProductContext.tsx"

export default function ProductList({ cart }: { cart: Cart }) {
  const { products } = useProductContext()

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
      <div className="space-y-2">
        {products.map((product) => (
          <ProductCard product={product} cart={cart} key={product.id} />
        ))}
      </div>
    </div>
  )
}
