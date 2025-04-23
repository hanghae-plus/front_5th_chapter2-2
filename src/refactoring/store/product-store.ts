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

export const useProductStore = create<ProductState>((set, get) => ({
  products: initialProducts,
  newProduct: initialProduct,
  showNewProductForm: false,
  editingProduct: null,

  initializeProducts: (products) => set({ products }),

  addProduct: (newProduct) => {
    const updated = addProduct(get().products, newProduct);
    set({ products: updated });
  },

  updateProduct: (updatedProduct) => {
    const updated = updateProduct(get().products, updatedProduct);
    set({ products: updated });
  },

  handleStockUpdate: (productId, newStock) => {
    const { updateEditingProduct, updateProduct } = get();
    const updated = handleStockUpdate(get().products, productId, newStock);

    if (!updated) return;
    updateProduct(updated);
    updateEditingProduct(updated);
  },

  updateNewProduct: (product) => set({ newProduct: product }),

  handleAddNewProduct: () => {
    const { newProduct, addProduct } = get();
    const productWithId = createProductWithId(newProduct);

    addProduct(productWithId);

    set({
      newProduct: initialProduct,
      showNewProductForm: false,
    });
  },

  toggleNewProductForm: () => {
    const { showNewProductForm } = get();
    set({
      showNewProductForm: !showNewProductForm,
    });
  },

  updateEditingProduct: (product) => set({ editingProduct: product }),
}));
