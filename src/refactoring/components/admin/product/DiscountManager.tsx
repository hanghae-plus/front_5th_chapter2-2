import { Discount, Product } from "../../../../types.ts"
import { useProductContext } from "../../../context/ProductContext.tsx"
import { useDiscountManager } from "../../../hooks/useDiscountManager.ts"
import Button from "../../ui/Button.tsx"
import Input, { InputType } from "../../ui/Input.tsx"
import { formatPercentage } from "../../../utils"

interface IDiscountManager {
  product: Product
  onDiscountsUpdate: (discounts: Discount[]) => void
}
export default function DiscountManager({ product, onDiscountsUpdate }: IDiscountManager) {
  const { updateProduct } = useProductContext()

  const { newDiscount, handleNewDiscountChange, handleAddDiscount, handleRemoveDiscount } = useDiscountManager({
    product,
    updateProduct,
    onDiscountsUpdate
  })

  return (
    <div>
      <h4 className="text-lg font-semibold mb-2">할인 정보</h4>
      {product.discounts.map((discount, index) => (
        <div key={index} className="flex justify-between items-center mb-2">
          <span>
            {discount.quantity}개 이상 구매 시 {formatPercentage(discount.rate)} 할인
          </span>
          <Button
            onClick={() => handleRemoveDiscount(index)}
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          >
            삭제
          </Button>
        </div>
      ))}
      <div className="flex space-x-2">
        <Input
          type={InputType.Number}
          placeholder="수량"
          value={newDiscount.quantity}
          onChange={(e) => handleNewDiscountChange("quantity", parseInt(e.target.value))}
          className="w-1/3 p-2 border rounded"
        />
        <Input
          type={InputType.Number}
          placeholder="할인율 (%)"
          value={newDiscount.rate * 100}
          onChange={(e) => handleNewDiscountChange("rate", parseInt(e.target.value) / 100)}
          className="w-1/3 p-2 border rounded"
        />
        <Button onClick={handleAddDiscount} className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          할인 추가
        </Button>
      </div>
    </div>
  )
}
