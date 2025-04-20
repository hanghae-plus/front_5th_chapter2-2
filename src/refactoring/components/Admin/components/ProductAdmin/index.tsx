import { Product } from '../../../../../types.ts';
import { AddProduct } from './components/AddProduct';
import { ProductList } from './components/ProductList';

interface Props {
  products: Product[];
  onProductUpdate: (updatedProduct: Product) => void;
  onProductAdd: (newProduct: Product) => void;
}

export const ProductAdmin = ({
  products,
  onProductUpdate,
  onProductAdd,
}: Props) => {
  return (
    <div id={'상품관리'}>
      <h2 className='text-2xl font-semibold mb-4'>상품 관리</h2>
      <AddProduct onProductAdd={onProductAdd} />
      <ProductList products={products} onProductUpdate={onProductUpdate} />
    </div>
  );
};
