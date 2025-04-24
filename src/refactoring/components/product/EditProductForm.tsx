import { ChangeEvent, useState } from 'react';
import { Button } from '../ui';
import type { Product, Discount } from '@/types';

interface EditProductFormProps {
  product: Product;
  onProductUpdate: (product: Product) => void;
  onCompleteEdit: (newProduct: Product) => void;
}

export const EditProductForm = ({
  product,
  onProductUpdate,
  onCompleteEdit,
}: EditProductFormProps) => {
  const [editingProduct, setEditingProduct] = useState<Product>(product);
  const [newDiscount, setNewDiscount] = useState<Discount>({
    quantity: 0,
    rate: 0,
  });

  const handleChangeProduct = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    setEditingProduct((prevEditingProduct) => {
      return {
        ...prevEditingProduct,
        [name]: type === 'number' ? parseInt(value) : value,
      };
    });
  };

  const handleChangeDiscount = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const intValue = parseInt(value);

    setNewDiscount((prevNewDiscount) => {
      return {
        ...prevNewDiscount,
        [name]: name === 'rate' ? intValue / 100 : intValue,
      };
    });
  };

  // 수정 완료 핸들러 함수 추가
  const handleEditComplete = () => {
    onCompleteEdit(editingProduct);
  };

  const handleAddDiscount = () => {
    const newProduct = {
      ...product,
      discounts: [...product.discounts, newDiscount],
    };
    onProductUpdate(newProduct);
    setEditingProduct(newProduct);
    setNewDiscount({ quantity: 0, rate: 0 });
  };

  const handleRemoveDiscount = (index: number) => {
    const newProduct = {
      ...product,
      discounts: product.discounts.filter((_, i) => i !== index),
    };
    onProductUpdate(newProduct);
    setEditingProduct(newProduct);
  };

  return (
    <div>
      <div className='mb-4'>
        <label className='block mb-1'>상품명: </label>
        <input
          type='text'
          name='name'
          value={editingProduct.name}
          onChange={handleChangeProduct}
          className='w-full p-2 border rounded'
        />
      </div>
      <div className='mb-4'>
        <label className='block mb-1'>가격: </label>
        <input
          type='number'
          name='price'
          value={editingProduct.price}
          onChange={handleChangeProduct}
          className='w-full p-2 border rounded'
        />
      </div>
      <div className='mb-4'>
        <label className='block mb-1'>재고: </label>
        <input
          type='number'
          name='stock'
          value={editingProduct.stock}
          onChange={handleChangeProduct}
          className='w-full p-2 border rounded'
        />
      </div>
      {/* 할인 정보 수정 부분 */}
      <div>
        <h4 className='text-lg font-semibold mb-2'>할인 정보</h4>
        {editingProduct.discounts.map((discount, index) => (
          <div
            key={index}
            className='flex justify-between items-center mb-2'
          >
            <span>
              {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
            </span>
            <Button
              className='px-2 py-1'
              variant='solid'
              color='red'
              onClick={() => handleRemoveDiscount(index)}
            >
              삭제
            </Button>
          </div>
        ))}
        <div className='flex space-x-2'>
          <input
            type='number'
            name='quantity'
            placeholder='수량'
            value={newDiscount.quantity}
            onChange={handleChangeDiscount}
            className='w-1/3 p-2 border rounded'
          />
          <input
            type='number'
            name='rate'
            placeholder='할인율 (%)'
            value={newDiscount.rate * 100}
            onChange={handleChangeDiscount}
            className='w-1/3 p-2 border rounded'
          />
          <Button
            className='w-1/3 p-2'
            variant='solid'
            color='blue'
            onClick={handleAddDiscount}
          >
            할인 추가
          </Button>
        </div>
      </div>
      <Button
        className='px-2 py-1 mt-2'
        variant='solid'
        color='green'
        onClick={handleEditComplete}
      >
        수정 완료
      </Button>
    </div>
  );
};
