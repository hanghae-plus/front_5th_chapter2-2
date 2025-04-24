import { useState } from "react"
import ProductItem from "./ProductItem"
import { useProductContext } from "../../../context/ProductContext.tsx"

export default function ProductList() {
  const { products } = useProductContext()
  const [openProductIds, setOpenProductIds] = useState<Set<string>>(new Set())
  const [editingProductId, setEditingProductId] = useState<string | null>(null)

  const toggleProductAccordion = (productId: string) => {
    setOpenProductIds((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(productId)) {
        newSet.delete(productId)
      } else {
        newSet.add(productId)
      }
      return newSet
    })
  }

  // 상품 수정 시작하기 위해 상품 Id 저장
  const handleEditStart = (productId: string) => {
    setEditingProductId(productId)
  }

  // 상품 수정이 완료되어 상품 Id를 초기화
  const handleEditComplete = () => {
    setEditingProductId(null)
  }

  return (
    <div className="space-y-2">
      {products.map((product, index) => (
        <ProductItem
          key={product.id}
          product={product}
          index={index}
          isOpen={openProductIds.has(product.id)}
          isEditing={editingProductId === product.id}
          onToggle={() => toggleProductAccordion(product.id)}
          onEditStart={() => handleEditStart(product.id)}
          onEditComplete={handleEditComplete}
        />
      ))}
    </div>
  )
}
