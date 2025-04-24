import { useNewProductForm } from "../../../hooks/useNewProductForm.ts"
import Button from "../../ui/Button.tsx"
import Input from "../../ui/Input.tsx"

interface INewProductForm {
  setShowNewProductForm: React.Dispatch<React.SetStateAction<boolean>>
}
export default function NewProductForm({ setShowNewProductForm }: INewProductForm) {
  const { newProduct, handleInputChange, handleAddNewProduct } = useNewProductForm(setShowNewProductForm)

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="text-xl font-semibold mb-2">새 상품 추가</h3>
      <div className="mb-2">
        <Input
          label="상품명"
          labelClassName="block text-sm font-medium text-gray-700"
          id="productName"
          type="text"
          value={newProduct.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <Input
          label="가격"
          labelClassName="block text-sm font-medium text-gray-700"
          id="productPrice"
          type="number"
          value={newProduct.price}
          onChange={(e) => handleInputChange("price", parseInt(e.target.value))}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <Input
          id="productStock"
          type="number"
          label={"재고"}
          labelClassName={"block text-sm font-medium text-gray-700"}
          value={newProduct.stock}
          onChange={(e) => handleInputChange("stock", parseInt(e.target.value))}
          className="w-full p-2 border rounded"
        />
      </div>
      <Button onClick={handleAddNewProduct} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        추가
      </Button>
    </div>
  )
}
