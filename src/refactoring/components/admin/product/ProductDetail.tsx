import { Product } from "../../../../types.ts"
import Button from "../../ui/Button.tsx"
import { formatPercentage } from "../../../utils"
interface IProductDetail {
  product: Product
  onEdit: () => void
}

export default function ProductDetail({ product, onEdit }: IProductDetail) {
  return (
    <div>
      {product.discounts.map((discount, index) => (
        <div key={index} className="mb-2">
          <span>
            {discount.quantity}개 이상 구매 시: {formatPercentage(discount.rate)} 할인
          </span>
        </div>
      ))}
      <Button
        data-testid="modify-button"
        onClick={onEdit}
        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-2"
      >
        수정
      </Button>
    </div>
  )
}
