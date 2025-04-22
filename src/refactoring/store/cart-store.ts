import { create } from "zustand";
import { CartItem, Product } from "../entities";

import {
  addToCart as logicAddToCart,
  removeFromCart as logicRemoveFromCart,
  updateQuantity as logicUpdateQuantity,
} from "../logic/cart/cart-logic";

interface CartStore {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  resetCart: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],

  addToCart: (product) => {
    const updatedCart = logicAddToCart(get().cart, product);
    set({ cart: updatedCart });
  },

  removeFromCart: (productId) => {
    const updatedCart = logicRemoveFromCart(get().cart, productId);
    set({ cart: updatedCart });
  },

  updateQuantity: (productId, quantity) => {
    const updated = logicUpdateQuantity(get().cart, productId, quantity);
    set({ cart: updated });
  },

  resetCart: () => set({ cart: [] }),
}));
