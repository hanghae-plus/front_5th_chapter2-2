import { Discount, Product } from "../../types.ts"
import { useState } from "react"
import { addDiscountToProduct, isValidDiscount, removeDiscountFromProduct } from "../models/discount.ts"

export function useDiscountManager({ product, updateProduct, onDiscountsUpdate }: { product: Product; updateProduct: (product: Product) => void, onDiscountsUpdate: (discounts: Discount[]) => void }) {
  const [newDiscount, setNewDiscount] = useState<Discount>({ quantity: 0, rate: 0 })

  const handleNewDiscountChange = (field: keyof Discount, value: number) => {
    setNewDiscount((prev) => ({ ...prev, [field]: value }))
  }

  const handleAddDiscount = () => {
    // 할인을 등록할때, 수량과 할인률이 없으면 추가를 하지 않음
    if (!isValidDiscount(newDiscount)) return;

    const newDiscounts = [...product.discounts, newDiscount]
    const newProduct = addDiscountToProduct(product, newDiscount);

    updateProduct(newProduct)

    onDiscountsUpdate(newDiscounts)

    setNewDiscount({ quantity: 0, rate: 0 })
  }

  const handleRemoveDiscount = (index: number) => {
    const newDiscounts = product.discounts.filter((_, i) => i !== index)

    const newProduct = removeDiscountFromProduct(product, index);

    onDiscountsUpdate(newDiscounts)

    updateProduct(newProduct)
  }

  return {
    newDiscount,
    handleNewDiscountChange,
    handleAddDiscount,
    handleRemoveDiscount,
  }
}
