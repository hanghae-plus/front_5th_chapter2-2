import { Product } from "../../types"

export const updateProduct = (product: Omit<Product, 'id'>, updateInfo: {key: keyof Omit<Product, 'id'>, value: Product[keyof Omit<Product, 'id'>]}): Omit<Product, 'id'> => {
  return {
    ...product,
    [updateInfo.key]: updateInfo.value
  }
}

export const createDefaultProduct = (): Omit<Product, 'id'> => {
  return {
    name: '',
    price: 0,
    stock: 0,
    discounts: []
  }
}

export const createProductWithId = (product: Omit<Product, 'id'>): Product => {
  return {
    ...product,
    id: Date.now().toString()
  }
}
