import { Product } from '../../../types';

interface Props {
  product: Product;
  toggleProductAccordion: (productId: string) => void;
}

function ProductToggleListItem({ product, toggleProductAccordion }: Props) {
  return (
    <button
      data-testid='toggle-button'
      onClick={() => toggleProductAccordion(product.id)}
      className='w-full text-left font-semibold'>
      {product.name} - {product.price}원 (재고: {product.stock})
    </button>
  );
}

export default ProductToggleListItem;
