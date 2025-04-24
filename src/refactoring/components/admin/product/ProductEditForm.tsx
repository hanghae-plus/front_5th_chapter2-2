import { useProductContext } from "../../../context/ProductContext.tsx"
import DiscountManager from "./DiscountManager.tsx"
import useProductEditForm from "../../../hooks/useProductEditForm.ts"
import { Product } from "../../../../types.ts"
import Button from "../../ui/Button.tsx"
import Input, { InputType } from "../../ui/Input.tsx"

interface IProductEditForm {
  product: Product
  onEditComplete: () => void
}
export default function ProductEditForm({ product, onEditComplete }: IProductEditForm) {
  const { updateProduct } = useProductContext()

  const { editingProduct, handleProductNameUpdate, handlePriceUpdate, handleStockUpdate, handleSaveChanges } =
    useProductEditForm({ product, updateProduct, onEditComplete })

  return (
    <div>
      <div className="mb-4">
        <label className="block mb-1">상품명: </label>
        <Input
          type={InputType.Text}
          value={editingProduct.name}
          onChange={(e) => handleProductNameUpdate(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">가격: </label>
        <Input
          type={InputType.Number}
          value={editingProduct.price}
          onChange={(e) => handlePriceUpdate(parseInt(e.target.value))}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">재고: </label>
        <Input
          type={InputType.Number}
          value={editingProduct.stock}
          onChange={(e) => handleStockUpdate(parseInt(e.target.value))}
          className="w-full p-2 border rounded"
        />
      </div>
      {/* 할인 정보 수정 부분 */}
      <DiscountManager product={product} />
      <Button onClick={handleSaveChanges} className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2">
        수정 완료
      </Button>
    </div>
  )
}
