import { createContext, useContext } from 'react';
import { useCart } from '../../hooks/useCart';
import { CartItem, Coupon, Product } from '../../../../entities';

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  applyCoupon: (coupon: Coupon) => void;
  calculateTotal: () => {
    totalBeforeDiscount: number;
    totalAfterDiscount: number;
    totalDiscount: number;
  };
  selectedCoupon: Coupon | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: React.ReactNode;
}

const CartProvider = ({ children }: CartProviderProps) => {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
  } = useCart();

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        applyCoupon,
        calculateTotal,
        selectedCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};

export { CartProvider, useCartContext, CartContext };
