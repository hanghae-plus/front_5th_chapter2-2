import { createContext, ReactNode, useContext } from "react"
import { useProducts } from "../hooks"
import { Product } from "../../types.ts"

// Context 타입 정의
type ProductContextType = {
  products: Product[]
  updateProduct: (product: Product) => void
  addProduct: (product: Product) => void
}

// Context 생성
const ProductContext = createContext<ProductContextType | undefined>(undefined)

// Provider 컴포넌트
export function ProductProvider({ children, initialProducts }: { children: ReactNode; initialProducts: Product[] }) {
  const { products, updateProduct, addProduct } = useProducts(initialProducts)

  return <ProductContext.Provider value={{ products, updateProduct, addProduct }}>{children}</ProductContext.Provider>
}

// Context를 쉽게 사용하기 위한 훅
export function useProductContext() {
  const context = useContext(ProductContext)
  if (context === undefined) {
    throw new Error("useProductContext는 ProductProvider 내에서만 사용할 수 있습니다.")
  }
  return context
}
