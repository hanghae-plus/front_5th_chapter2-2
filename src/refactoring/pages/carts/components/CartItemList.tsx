import { CartItem } from '../../../../types';
import { CartItemActions } from './CartItemActions';

type CartItemListProps = {
  cart: CartItem[];
  getAppliedDiscount: (item: CartItem) => number;
  updateQuantity: (productId: string, newQuantity: number) => void;
  removeFromCart: (productId: string) => void;
};

export const CartItemList = ({
  cart,
  getAppliedDiscount,
  updateQuantity,
  removeFromCart,
}: CartItemListProps) => (
  <div className="space-y-2">
    {cart.map((item) => {
      const appliedDiscount = getAppliedDiscount(item);
      return (
        <div
          key={item.product.id}
          className="flex justify-between items-center bg-white p-3 rounded shadow">
          <div>
            <span className="font-semibold">{item.product.name}</span>
            <br />
            <span className="text-sm text-gray-600">
              {item.product.price}원 x {item.quantity}
              {appliedDiscount > 0 && (
                <span className="text-green-600 ml-1">
                  ({(appliedDiscount * 100).toFixed(0)}% 할인 적용)
                </span>
              )}
            </span>
          </div>
          <CartItemActions
            onIncrease={() => updateQuantity(item.product.id, item.quantity + 1)}
            onDecrease={() => updateQuantity(item.product.id, item.quantity - 1)}
            onRemove={() => removeFromCart(item.product.id)}
          />
        </div>
      );
    })}
  </div>
);
