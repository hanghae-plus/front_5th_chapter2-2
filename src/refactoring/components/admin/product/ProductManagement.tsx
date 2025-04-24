import NewProductForm from "./NewProductForm.tsx"
import ProductList from "./ProductList.tsx"
import { useState } from "react"

export default function ProductManagement() {
  /** 상품 등록 폼 노출 유무 */
  const [showNewProductForm, setShowNewProductForm] = useState(false)

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
      {/* 상품 추가 버튼 */}
      <button
        onClick={() => setShowNewProductForm(!showNewProductForm)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
      >
        {showNewProductForm ? "취소" : "새 상품 추가"}
      </button>

      {/* 상품 등록 폼 */}
      {showNewProductForm && <NewProductForm setShowNewProductForm={setShowNewProductForm} />}

      {/* 상품 목록 */}
      <ProductList />
    </div>
  )
}
