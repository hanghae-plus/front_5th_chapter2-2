import { ProductCard } from '../product';
import { Button } from '../ui';
import type { Product } from '@/types';

interface ProductCardWithAddProps {
  product: Product;
  remainingStock: number;
  addToCart: (product: Product) => void;
}

export const ProductCardWithAdd = ({
  product,
  remainingStock,
  addToCart,
}: ProductCardWithAddProps) => {
  const handleClick = () => {
    addToCart(product);
  };

  return (
    <ProductCard
      product={product}
      remainingStock={remainingStock}
    >
      <Button
        className={`w-full px-3 py-1`}
        variant='solid'
        color='blue'
        onClick={handleClick}
        disabled={remainingStock <= 0}
      >
        {remainingStock > 0 ? '장바구니에 추가' : '품절'}
      </Button>
    </ProductCard>
  );
};
