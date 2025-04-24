import { Product } from '../../../types';

interface Props {
  editingProduct: Product;
  handleProductNameUpdate: (productId: string, newName: string) => void;
  handlePriceUpdate: (productId: string, newPrice: number) => void;
  handleStockUpdate: (productId: string, newStock: number) => void;
}

function ProductEdit({
  editingProduct,
  handleProductNameUpdate,
  handlePriceUpdate,
  handleStockUpdate,
}: Props) {
  return (
    <div>
      <div className='mb-4'>
        <label className='block mb-1'>상품명: </label>
        <input
          type='text'
          value={editingProduct.name}
          onChange={(e) =>
            handleProductNameUpdate(editingProduct.id, e.target.value)
          }
          className='w-full p-2 border rounded'
        />
      </div>
      <div className='mb-4'>
        <label className='block mb-1'>가격: </label>
        <input
          type='number'
          value={editingProduct.price}
          onChange={(e) =>
            handlePriceUpdate(editingProduct.id, parseInt(e.target.value))
          }
          className='w-full p-2 border rounded'
        />
      </div>
      <div className='mb-4'>
        <label className='block mb-1'>재고: </label>
        <input
          type='number'
          value={editingProduct.stock}
          onChange={(e) =>
            handleStockUpdate(editingProduct.id, parseInt(e.target.value))
          }
          className='w-full p-2 border rounded'
        />
      </div>
    </div>
  );
}

export default ProductEdit;
