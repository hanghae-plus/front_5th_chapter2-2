import { ChangeEvent, useState } from 'react';
import { Button } from '../ui';
import { validateFields } from '@/refactoring/utils';
import type { Product } from '@/types';

interface NewProductFormProps {
  onAddNewProduct: (newProduct: Product) => void;
}

const initialProduct = {
  name: '',
  price: 0,
  stock: 0,
};

export const NewProductForm = ({ onAddNewProduct }: NewProductFormProps) => {
  const [newProduct, setNewProduct] =
    useState<Omit<Product, 'id' | 'discounts'>>(initialProduct);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;

    setNewProduct((prevNewProduct) => {
      return {
        ...prevNewProduct,
        [name]: type === 'number' ? parseInt(value) : value,
      };
    });
  };

  const handleClick = () => {
    if (
      validateFields<Omit<Product, 'id' | 'discounts'>>(
        newProduct,
        '새 상품 정보를 입력해주세요.',
      )
    )
      return;

    const productWithIdAndDiscounts = {
      ...newProduct,
      id: Date.now().toString(),
      discounts: [],
    };

    onAddNewProduct(productWithIdAndDiscounts);
    setNewProduct(initialProduct);
  };

  return (
    <div className='bg-white p-4 rounded shadow mb-4'>
      <h3 className='text-xl font-semibold mb-2'>새 상품 추가</h3>
      <div className='mb-2'>
        <label
          htmlFor='productName'
          className='block text-sm font-medium text-gray-700'
        >
          상품명
        </label>
        <input
          id='productName'
          type='text'
          name='name'
          value={newProduct.name}
          onChange={handleChange}
          className='w-full p-2 border rounded'
        />
      </div>
      <div className='mb-2'>
        <label
          htmlFor='productPrice'
          className='block text-sm font-medium text-gray-700'
        >
          가격
        </label>
        <input
          id='productPrice'
          type='number'
          name='price'
          value={newProduct.price}
          onChange={handleChange}
          className='w-full p-2 border rounded'
        />
      </div>
      <div className='mb-2'>
        <label
          htmlFor='productStock'
          className='block text-sm font-medium text-gray-700'
        >
          재고
        </label>
        <input
          id='productStock'
          type='number'
          name='stock'
          value={newProduct.stock}
          onChange={handleChange}
          className='w-full p-2 border rounded'
        />
      </div>
      <Button
        className='w-full p-2'
        variant='solid'
        color='blue'
        onClick={handleClick}
      >
        추가
      </Button>
    </div>
  );
};
