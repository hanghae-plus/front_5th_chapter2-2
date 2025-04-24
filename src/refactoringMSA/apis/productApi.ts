import { Product } from '../../types';

export const getProducts = async () => {
  try {
    const response = await fetch('http://localhost:5173/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const updateProduct = async (product: Product) => {
  try {
    const response = await fetch(
      `http://localhost:5173/products/${product.id}`,
      {
        method: 'PUT',
        body: JSON.stringify(product),
      },
    );
    if (!response.ok) {
      throw new Error('Failed to update product');
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const addProduct = async (product: Product) => {
  try {
    const response = await fetch('http://localhost:5173/products', {
      method: 'POST',
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error('Failed to add product');
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
};
