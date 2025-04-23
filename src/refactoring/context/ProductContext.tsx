import { createContext, ReactNode, useContext } from "react"
import { useProducts } from "../hooks"
import { Product } from "../../types.ts"

// 초기 상품 데이터
const initialProducts: Product[] = [
  {
    id: "p1",
    name: "상품1",
    price: 10000,
    stock: 20,
    discounts: [
      { quantity: 10, rate: 0.1 },
      { quantity: 20, rate: 0.2 },
    ],
  },
  {
    id: "p2",
    name: "상품2",
    price: 20000,
    stock: 20,
    discounts: [{ quantity: 10, rate: 0.15 }],
  },
  {
    id: "p3",
    name: "상품3",
    price: 30000,
    stock: 20,
    discounts: [{ quantity: 10, rate: 0.2 }],
  },
]

// Context 타입 정의
type ProductContextType = {
  products: Product[]
  updateProduct: (product: Product) => void
  addProduct: (product: Product) => void
}

// Context 생성
const ProductContext = createContext<ProductContextType | undefined>(undefined)

// Provider 컴포넌트
export function ProductProvider({ children }: { children: ReactNode }) {
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
