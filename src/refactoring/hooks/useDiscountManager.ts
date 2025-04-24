import { Discount, Product } from "../../types.ts"
import { useState } from "react"

export function useDiscountManager({
  product,
  updateProduct,
}: {
  product: Product
  updateProduct: (product: Product) => void
}) {
  const [newDiscount, setNewDiscount] = useState<Discount>({ quantity: 0, rate: 0 })

  const handleNewDiscountChange = (field: keyof Discount, value: number) => {
    setNewDiscount((prev) => ({ ...prev, [field]: value }))
  }

  const handleAddDiscount = () => {
    // 할인을 등록할때, 수량과 할인률이 없으면 추가를 하지 않음
    if (newDiscount.quantity <= 0 || newDiscount.rate <= 0) return

    const newProduct = {
      ...product,
      discounts: [...product.discounts, newDiscount],
    }

    updateProduct(newProduct)
    setNewDiscount({ quantity: 0, rate: 0 })
  }

  const handleRemoveDiscount = (index: number) => {
    const newProduct = {
      ...product,
      discounts: product.discounts.filter((_, i) => i !== index),
    }

    updateProduct(newProduct)
  }

  return {
    newDiscount,
    handleNewDiscountChange,
    handleAddDiscount,
    handleRemoveDiscount,
  }
}
