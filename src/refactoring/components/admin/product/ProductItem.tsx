import ProductDetail from "./ProductDetail"
import ProductEditForm from "./ProductEditForm"
import { Product } from "../../../../types.ts"
import Button from "../../ui/Button.tsx"

interface IProductItem {
  product: Product
  index: number
  isOpen: boolean
  isEditing: boolean
  onToggle: () => void
  onEditStart: () => void
  onEditComplete: () => void
}

export default function ProductItem({
  product,
  index,
  isOpen,
  isEditing,
  onToggle,
  onEditStart,
  onEditComplete,
}: IProductItem) {
  return (
    <div data-testid={`product-${index + 1}`} className="bg-white p-4 rounded shadow">
      <Button data-testid="toggle-button" onClick={onToggle} className="w-full text-left font-semibold">
        {product.name} - {product.price}원 (재고: {product.stock})
      </Button>

      {isOpen && (
        <div className="mt-2">
          {isEditing ? (
            <ProductEditForm product={product} onEditComplete={onEditComplete} />
          ) : (
            <ProductDetail product={product} onEdit={onEditStart} />
          )}
        </div>
      )}
    </div>
  )
}
