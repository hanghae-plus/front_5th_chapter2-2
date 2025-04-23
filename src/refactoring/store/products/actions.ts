import { atom } from "jotai";

import {
  productsAtom,
  openProductIdsAtom,
  editingProductAtom,
  newDiscountAtom,
  showNewProductFormAtom,
  newProductAtom,
  getNewProductWithIdAtom,
} from "./atom";
import { Product } from "../../../types";

// 아코디언 토글
export const toggleProductAccordionAtom = atom(
  null,
  (get, set, productId: string) => {
    const currentOpenIds = new Set(get(openProductIdsAtom));
    if (currentOpenIds.has(productId)) {
      currentOpenIds.delete(productId);
    } else {
      currentOpenIds.add(productId);
    }
    set(openProductIdsAtom, currentOpenIds);
  }
);

// 상품 업데이트
export const handleEditProductAtom = atom(null, (_, set, product: Product) => {
  set(editingProductAtom, { ...product });
});

// 상품 업데이트 취소
export const handleCancelEditAtom = atom(null, (_, set) => {
  set(editingProductAtom, null);
});

//상품 필드 업데이트
export const handleUpdateEditingFieldAtom = atom(
  null,
  (get, set, { field, value }: { field: keyof Product; value: any }) => {
    const currentProduct = get(editingProductAtom);
    if (currentProduct) {
      set(editingProductAtom, { ...currentProduct, [field]: value });
    }
  }
);

// 할인 추가
export const handleAddDiscountAtom = atom(null, (get, set) => {
  const currentProduct = get(editingProductAtom);
  const discount = get(newDiscountAtom);

  if (currentProduct) {
    set(editingProductAtom, {
      ...currentProduct,
      discounts: [...currentProduct.discounts, discount],
    });
    set(newDiscountAtom, { quantity: 0, rate: 0 });
  }
});

// 할인 삭제
export const handleRemoveDiscountAtom = atom(
  null,
  (get, set, index: number) => {
    const currentProduct = get(editingProductAtom);
    if (currentProduct) {
      set(editingProductAtom, {
        ...currentProduct,
        discounts: currentProduct.discounts.filter((_, i) => i !== index),
      });
    }
  }
);

// 프로덕트 추가 보여주기
export const toggleNewProductFormAtom = atom(null, (get, set) => {
  set(showNewProductFormAtom, !get(showNewProductFormAtom));
});

//
export const updateNewProductAtom = atom(
  null,
  (
    get,
    set,
    { field, value }: { field: keyof Omit<Product, "id">; value: any }
  ) => {
    const currentNewProduct = get(newProductAtom);
    set(newProductAtom, { ...currentNewProduct, [field]: value });
  }
);

// 프로덕트 리셋
export const resetNewProductAtom = atom(null, (_, set) => {
  set(newProductAtom, {
    name: "",
    price: 0,
    stock: 0,
    discounts: [],
  });
  set(showNewProductFormAtom, false);
});

// 상품 저장 및 추가 액션
export const handleSaveProductAtom = atom(null, (get, set) => {
  const currentProduct = get(editingProductAtom);
  if (currentProduct) {
    set(productsAtom, (prev) =>
      prev.map((p) => (p.id === currentProduct.id ? currentProduct : p))
    );
    set(editingProductAtom, null);
  }
});

export const handleAddNewProductAtom = atom(null, (get, set) => {
  const newProductWithId = get(getNewProductWithIdAtom);
  set(productsAtom, (prev) => [...prev, newProductWithId]);
  set(resetNewProductAtom);
});
