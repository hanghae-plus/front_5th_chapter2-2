import { createContext, useContext } from 'react';
import { Product } from '../../../entities';
import { useProducts } from '../../../hooks';

export interface ProductContextType {
  products: Product[];
  updateProduct: (product: Product) => void;
  addProduct: (newProduct: Product) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const initialProducts: Product[] = [
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

interface ProductProviderProps {
  children: React.ReactNode;
}

const ProductProvider = ({ children }: ProductProviderProps) => {
  const { products, updateProduct, addProduct } = useProducts(initialProducts);

  return (
    <ProductContext.Provider value={{ products, updateProduct, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};

export { ProductProvider, useProductContext, ProductContext };
