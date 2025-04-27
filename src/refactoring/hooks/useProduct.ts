import { useState } from 'react';
import { Coupon, Discount, Product } from '../../types.ts';

const updateProductInList = (products: Product[], updatedProduct: Product) => {
  return products.map((product) => (product.id === updatedProduct.id ? updatedProduct : product));
};

const addProductToList = (products: Product[], newProduct: Product) => {
  return [...products, newProduct];
};

export const initialProducts: Product[] = [
  {
    id: 'p1',
    name: '상품1',
    price: 10000,
    stock: 20,
    discounts: [
      { quantity: 10, rate: 0.1 },
      { quantity: 20, rate: 0.2 },
    ],
  },
  {
    id: 'p2',
    name: '상품2',
    price: 20000,
    stock: 20,
    discounts: [{ quantity: 10, rate: 0.15 }],
  },
  {
    id: 'p3',
    name: '상품3',
    price: 30000,
    stock: 20,
    discounts: [{ quantity: 10, rate: 0.2 }],
  },
];

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [openProductIds, setOpenProductIds] = useState<Set<string>>(new Set());
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newDiscount, setNewDiscount] = useState<Discount>({ quantity: 0, rate: 0 });
  const [newCoupon, setNewCoupon] = useState<Coupon>({
    name: '',
    code: '',
    discountType: 'percentage',
    discountValue: 0,
  });
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    stock: 0,
    discounts: [],
  });

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prevProducts) => updateProductInList(prevProducts, updatedProduct));
  };

  const addProduct = (newProduct: Product) => {
    setProducts((prevProducts) => addProductToList(prevProducts, newProduct));
  };

  return {
    products,
    updateProduct,
    addProduct,
  };
};
