import { Product } from "../../types";
export const useProductSearch = (products: Product[], searchValue: string) => {
    return products.filter((product) => product.name.includes(searchValue))
}