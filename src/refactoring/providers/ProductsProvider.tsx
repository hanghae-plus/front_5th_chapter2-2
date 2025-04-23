import React, {useState, useMemo, useCallback, PropsWithChildren} from "react"
import { Product } from "../../types";
import { ProductsContext } from "../context/ProductsContext";

export const initialProducts = [{
    id: 'p1',
    name: '상품1',
    price: 10000,
    stock: 20,
    discounts: [{ quantity: 10, rate: 0.1 }, { quantity: 20, rate: 0.2 }]
},
{
    id: 'p2',
    name: '상품2',
    price: 20000,
    stock: 20,
    discounts: [{ quantity: 10, rate: 0.15 }]
},
{
    id: 'p3',
    name: '상품3',
    price: 30000,
    stock: 20,
    discounts: [{ quantity: 10, rate: 0.2 }]
}]

export const ProductsProvider: React.FC<PropsWithChildren> = ({children}) => {
    const [products, setProducts] = useState<Product[]>(() => initialProducts)

    const updateProduct = useCallback((updatedProduct: Product) => {
        setProducts(prevProducts =>
          prevProducts.map(p => p.id === updatedProduct.id ? updatedProduct : p)
        );
      }, [products])
    
      const addProduct = useCallback((newProduct: Product) => {
        setProducts(prevProducts => [...prevProducts, newProduct]);
      }, [products])

      const productsContextValue = useMemo(() => ({
        products,
        updateProduct,
        addProduct
      }), [products])

    return (
        <ProductsContext.Provider value={productsContextValue}>
            {children}
        </ProductsContext.Provider>
    )
}