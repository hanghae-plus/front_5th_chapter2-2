import { CartItem } from "../../6_shared/types";

export interface CartItemProps {
  cartItem: CartItem;
}

export interface QuantityControlProps {
  onDecreaseClick: () => void;
  onIncreaseClick: () => void;
  onRemoveClick: () => void;
}
