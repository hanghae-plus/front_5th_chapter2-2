import { create } from "zustand";
import { initialProduct, initialProducts } from "../data";
import { Product } from "../entities";
import {
  addProduct,
  createProductWithId,
  handleStockUpdate,
  updateProduct,
} from "../logic/product/product-logic";

interface ProductState {
  products: Product[];
  newProduct: Omit<Product, "id">;
  showNewProductForm: boolean;
  editingProduct: Product | null;

  // Actions
  initializeProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  handleStockUpdate: (productId: string, newStock: number) => void;

  updateNewProduct: (newProduct: Omit<Product, "id">) => void;
  handleAddNewProduct: () => void;
  toggleNewProductForm: () => void;
  updateEditingProduct: (product: Product | null) => void;
}

/**
 * Product에 대한 store
 *
 * - 상품 목록 상태 (`products`)
 * - 신규 상품 입력 상태 (`newProduct`)
 * - 상품 편집 상태 (`editingProduct`)
 * - 새 상품 폼 표시 여부 (`showNewProductForm`)
 *
 * @returns 상품 목록 초기화, 추가, 수정, 재고 변경 등 상태 조작 메서드를 포함한 store
 */

export const useProductStore = create<ProductState>((set, get) => ({
  products: initialProducts,
  newProduct: initialProduct,
  showNewProductForm: false,
  editingProduct: null,
  // 상품 초기화
  initializeProducts: (products) => set({ products }),
  // 상품 추가
  addProduct: (newProduct) => {
    const updated = addProduct(get().products, newProduct);
    set({ products: updated });
  },
  // 상품 업데이트
  updateProduct: (updatedProduct) => {
    const updated = updateProduct(get().products, updatedProduct);
    set({ products: updated });
  },
  /**
   * 편집 중인 상품 상태를 갱신하거나 null로 리셋
   */
  updateEditingProduct: (product) => set({ editingProduct: product }),

  /**
   * 특정 상품의 재고를 변경하고, 편집 상태도 함께 반영
   */
  handleStockUpdate: (productId, newStock) => {
    const { updateEditingProduct, updateProduct } = get();
    const updated = handleStockUpdate(get().products, productId, newStock);

    if (!updated) return;
    updateProduct(updated);
    updateEditingProduct(updated);
  },

  /**
   * 신규 상품 입력 상태를 업데이트
   */
  updateNewProduct: (product) => set({ newProduct: product }),

  /**
   * 입력된 신규 상품을 추가하고 입력 상태를 초기화
   */
  handleAddNewProduct: () => {
    const { newProduct, addProduct } = get();
    const productWithId = createProductWithId(newProduct);

    addProduct(productWithId);

    set({
      newProduct: initialProduct,
      showNewProductForm: false,
    });
  },
  /**
   * 신규 상품 폼의 표시 상태를 토글
   */
  toggleNewProductForm: () => {
    const { showNewProductForm } = get();
    set({
      showNewProductForm: !showNewProductForm,
    });
  },
}));
