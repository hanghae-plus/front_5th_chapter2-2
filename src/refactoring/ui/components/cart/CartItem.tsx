import { CartItem as CartItemType } from '../../../../types';
import { getAppliedDiscount } from '../../../functions/cartFunctions';
import { CartItemControls } from './CartItemControls';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export const CartItemComponent = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
  const appliedDiscount = getAppliedDiscount(item);
  
  return (
    <div className="flex justify-between items-center bg-white p-3 rounded shadow">
      <div>
        <span className="font-semibold">{item.product.name}</span>
        <br/>
        <span className="text-sm text-gray-600">
          {item.product.price}원 x {item.quantity}
          {appliedDiscount > 0 && (
            <span className="text-green-600 ml-1">
              ({(appliedDiscount * 100).toFixed(0)}% 할인 적용)
            </span>
          )}
        </span>
      </div>
      <CartItemControls 
        productId={item.product.id}
        quantity={item.quantity}
        onUpdateQuantity={onUpdateQuantity}
        onRemove={onRemove}
      />
    </div>
  );
}; 