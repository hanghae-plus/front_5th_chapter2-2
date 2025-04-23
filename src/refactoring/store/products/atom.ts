import { atom } from "jotai";
import { Discount, Product } from "../../../types";
import { initialProducts } from "../../constants";

export const productsAtom = atom<Product[]>(initialProducts);
export const openProductIdsAtom = atom<Set<string>>(new Set<string>());
export const editingProductAtom = atom<Product | null>(null);
export const newDiscountAtom = atom<Discount>({
  quantity: 0,
  rate: 0,
});
export const showNewProductFormAtom = atom<boolean>(false);
export const newProductAtom = atom<Omit<Product, "id">>({
  name: "",
  price: 0,
  stock: 0,
  discounts: [],
});

export const getNewProductWithIdAtom = atom((get) => {
  const newProduct = get(newProductAtom);
  return { ...newProduct, id: Date.now().toString() };
});
