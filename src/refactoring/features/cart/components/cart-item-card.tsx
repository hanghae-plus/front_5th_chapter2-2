import { CartItem } from '../../shared/types/entities';
import { getAppliedDiscount } from '../../shared/utils/cartUtils';
import { Button } from '../../../ui/Button';

interface CartItemCardProps {
  item: CartItem;
  onRemove: (productId: string) => void;
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
}
// 장바구니 아이템 카드 컴포넌트
export const CartItemCard = ({ item, onRemove, onUpdateQuantity }: CartItemCardProps) => {
  const appliedDiscount = getAppliedDiscount(item);

  return (
    <div className="flex justify-between items-center bg-white p-3 rounded shadow">
      <div>
        <span className="font-semibold">{item.product.name}</span>
        <br />
        <span className="text-sm text-gray-600">
          {item.product.price}원 x {item.quantity}
          {appliedDiscount > 0 && (
            <span className="text-green-600 ml-1">({(appliedDiscount * 100).toFixed(0)}% 할인 적용)</span>
          )}
        </span>
      </div>
      <div>
        <Button onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)} role="quantity">
          -
        </Button>
        <Button onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)} role="quantity">
          +
        </Button>
        <Button onClick={() => onRemove(item.product.id)} role="delete">
          삭제
        </Button>
      </div>
    </div>
  );
};
