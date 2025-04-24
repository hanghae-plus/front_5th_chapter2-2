import { Button } from '../ui';
import type { Product } from '@/types';

interface ProductDiscountEditorProps {
  product: Product;
  onProductEdit: (productId: string) => void;
}

export const ProductDiscountEditor = ({
  product,
  onProductEdit,
}: ProductDiscountEditorProps) => {
  const { id, discounts } = product;

  const handleClick = () => {
    onProductEdit(id);
  };

  return (
    <div>
      {discounts.map((discount, index) => (
        <div
          key={index}
          className='mb-2'
        >
          <span>
            {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
          </span>
        </div>
      ))}
      <Button
        className='px-2 py-1 mt-2'
        variant='solid'
        color='blue'
        data-testid='modify-button'
        onClick={handleClick}
      >
        수정
      </Button>
    </div>
  );
};
