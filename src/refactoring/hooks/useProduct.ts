import { useState } from "react";
import { Product } from "../../types.ts";

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState(initialProducts)

  //파라미터에는 업데이트할 product
  //상태 변경할 함수 

  const updateProduct = (updated : Product)=>{
    setProducts((prevProduct)=> prevProduct.map((product)=> product.id === updated.id ? {...product, ...updated} : product))
  }

  const addProduct = (added: Product) =>{
    setProducts((prevProduct)=> {
      const newProduct = added
      return [...prevProduct, newProduct]
    })
  }
  return {
    products: products,
    updateProduct: updateProduct,
    addProduct: addProduct,
  };
};
