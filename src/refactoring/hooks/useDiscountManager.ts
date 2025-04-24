import { Discount, Product } from "../../types.ts"
import { useState } from "react"
import { addDiscountToProduct, isValidDiscount, removeDiscountFromProduct } from "../models/discount.ts"

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
    if (!isValidDiscount(newDiscount)) return;

    const newProduct = addDiscountToProduct(product, newDiscount);

    updateProduct(newProduct)
    setNewDiscount({ quantity: 0, rate: 0 })
  }

  const handleRemoveDiscount = (index: number) => {
    const newProduct = removeDiscountFromProduct(product, index);
    updateProduct(newProduct)
  }

  return {
    newDiscount,
    handleNewDiscountChange,
    handleAddDiscount,
    handleRemoveDiscount,
  }
}
