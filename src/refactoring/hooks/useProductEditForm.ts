import { Discount, Product } from "../../types.ts"
import { useState } from "react"

export default function useProductEditForm({
  product,
  updateProduct,
  onEditComplete,
}: {
  product: Product
  updateProduct: (product: Product) => void
  onEditComplete: () => void
}) {
  const [editingProduct, setEditingProduct] = useState<Product>(product)

  const handleProductNameUpdate = (newName: string) => {
    setEditingProduct((prev) => ({ ...prev, name: newName }))
  }

  const handlePriceUpdate = (newPrice: number) => {
    setEditingProduct((prev) => ({ ...prev, price: newPrice }))
  }

  const handleStockUpdate = (newStock: number) => {
    setEditingProduct((prev) => ({ ...prev, stock: newStock }))
  }

  const handleSaveChanges = () => {
    updateProduct(editingProduct)
    onEditComplete()
  }

  return {
    editingProduct,
    handleProductNameUpdate,
    handlePriceUpdate,
    handleStockUpdate,
    handleSaveChanges,
  }
}
