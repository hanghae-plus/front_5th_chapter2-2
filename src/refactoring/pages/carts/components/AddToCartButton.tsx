import { Product } from '../../../../types';

type AddToCartButtonProps = {
  product: Product;
  remainingStock: number;
  onAddToCart: (product: Product) => void;
};

export const AddToCartButton = ({ product, remainingStock, onAddToCart }: AddToCartButtonProps) => {
  const isSoldOut = remainingStock <= 0;

  return (
    <button
      onClick={() => onAddToCart(product)}
      className={`w-full px-3 py-1 rounded ${
        isSoldOut
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-blue-500 text-white hover:bg-blue-600'
      }`}
      disabled={isSoldOut}>
      {isSoldOut ? '품절' : '장바구니에 추가'}
    </button>
  );
};
