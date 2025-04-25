import { CartItem } from '../../../../types';
import { CartItemComponent } from './CartItem';
import { CartListHeader } from './CartListHeader';
import { EmptyCartMessage } from './EmptyCartMessage';

interface CartListProps {
  cart: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export const CartList = ({ cart, onUpdateQuantity, onRemove }: CartListProps) => {
  const isCartEmpty = cart.length === 0;

  return (
    <div>
      <CartListHeader />
      
      <div className="space-y-2">
        {isCartEmpty ? (
          <EmptyCartMessage />
        ) : (
          cart.map(item => (
            <CartItemComponent
              key={item.product.id}
              item={item}
              onUpdateQuantity={onUpdateQuantity}
              onRemove={onRemove}
            />
          ))
        )}
      </div>
    </div>
  );
};
