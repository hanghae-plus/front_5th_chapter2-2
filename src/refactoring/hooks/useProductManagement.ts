import { useState } from 'react';
import { Product, Discount } from '../../types';

export const useProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    stock: 0,
    discounts: []
  });
  const [newDiscount, setNewDiscount] = useState<Discount>({
    quantity: 0,
    rate: 0
  });

  const handleNewProductChange = (product: Omit<Product, 'id'>) => {
    setNewProduct(product);
  };

  const handleAddNewProduct = () => {
    const product: Product = {
      ...newProduct,
      id: Date.now().toString()
    };
    setProducts([...products, product]);
    setNewProduct({
      name: '',
      price: 0,
      stock: 0,
      discounts: []
    });
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleDelete = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const handleProductUpdate = (productId: string, field: string, value: string | number) => {
    if (!editingProduct) return;
    
    setEditingProduct({
      ...editingProduct,
      [field]: value
    });
  };

  const handleDiscountAdd = (productId: string) => {
    if (!editingProduct) return;
    
    setEditingProduct({
      ...editingProduct,
      discounts: [...editingProduct.discounts, newDiscount]
    });
    setNewDiscount({ quantity: 0, rate: 0 });
  };

  const handleDiscountRemove = (productId: string, index: number) => {
    if (!editingProduct) return;
    
    setEditingProduct({
      ...editingProduct,
      discounts: editingProduct.discounts.filter((_, i) => i !== index)
    });
  };

  const handleNewDiscountChange = (discount: Discount) => {
    setNewDiscount(discount);
  };

  const handleEditComplete = () => {
    if (!editingProduct) return;
    
    setProducts(products.map(p => 
      p.id === editingProduct.id ? editingProduct : p
    ));
    setEditingProduct(null);
  };

  return {
    products,
    editingProduct,
    newProduct,
    newDiscount,
    handleNewProductChange,
    handleAddNewProduct,
    handleEdit,
    handleDelete,
    handleProductUpdate,
    handleDiscountAdd,
    handleDiscountRemove,
    handleNewDiscountChange,
    handleEditComplete
  };
}; 