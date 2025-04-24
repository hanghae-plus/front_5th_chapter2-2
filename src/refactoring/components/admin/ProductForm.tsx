import { CardBox } from '../layout/CardBox';
import { Input } from '../shared/Input';
import { Product } from '../../types';

interface Props {
  product: Omit<Product, 'id'>;
  setProduct: (product: Omit<Product, 'id'>) => void;
  onSubmit: () => void;
}

export const ProductForm = ({ product, setProduct, onSubmit }: Props) => {
  return (
    <CardBox className="mb-4">
      <h3 className="text-xl font-semibold mb-2">새 상품 추가</h3>
      <div className="mb-2">
        <Input
          label="상품명"
          id="productName"
          type="text"
          value={product.name}
          onChange={e => setProduct({ ...product, name: e.target.value })}
        />
      </div>
      <div className="mb-2">
        <Input
          label="가격"
          id="productPrice"
          type="number"
          value={product.price}
          onChange={e =>
            setProduct({
              ...product,
              price: parseInt(e.target.value),
            })
          }
        />
      </div>
      <div className="mb-2">
        <Input
          label="재고"
          id="productStock"
          type="number"
          value={product.stock}
          onChange={e =>
            setProduct({
              ...product,
              stock: parseInt(e.target.value),
            })
          }
        />
      </div>
      <button
        onClick={onSubmit}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        추가
      </button>
    </CardBox>
  );
};
