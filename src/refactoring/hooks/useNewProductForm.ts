import { useState } from "react"
import { useProductContext } from "../context/ProductContext.tsx"
import { Product } from "../../types.ts"

const INITIAL_PRODUCT_STATE = {
  name: "",
  price: 0,
  stock: 0,
  discounts: [],
}

export function useNewProductForm(setShowNewProductForm: React.Dispatch<React.SetStateAction<boolean>>) {
  const { addProduct } = useProductContext()
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>(INITIAL_PRODUCT_STATE)

  const handleInputChange = (field: keyof Omit<Product, "id">, value: any) => {
    setNewProduct({ ...newProduct, [field]: value })
  }

  const handleAddNewProduct = () => {
    const productWithId = { ...newProduct, id: Date.now().toString() }
    addProduct(productWithId)
    setNewProduct(INITIAL_PRODUCT_STATE)
    setShowNewProductForm(false)
  }

  return {
    newProduct,
    handleInputChange,
    handleAddNewProduct,
  }
}
