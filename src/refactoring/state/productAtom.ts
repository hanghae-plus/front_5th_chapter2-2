import { atom } from "jotai";
import type { Product } from "../types";
import { initialProducts } from "../mock";

export const productsAtom = atom<Product[]>(initialProducts);

export const addProductAtom = atom(null, (get, set, newProduct: Product) => {
  set(productsAtom, [...get(productsAtom), newProduct]);
});

export const updateProductAtom = atom(null, (get, set, updated: Product) => {
  set(
    productsAtom,
    get(productsAtom).map((p) => (p.id === updated.id ? updated : p))
  );
});
