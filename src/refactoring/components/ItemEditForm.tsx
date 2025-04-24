// import { useState } from "react";
// import { Product } from "../../types";
// import { Button } from "./Button";

// interface ItemEditFormProps {
//   products: Product[];
//   onProductUpdate: (updatedProduct: Product) => void;
// }

// export const ItemEditForm = ({
//   products,
//   onProductUpdate,
// }: ItemEditFormProps) => {
//   const [editingProduct, setEditingProduct] = useState<Product | null>(null);

//   const handleProductNameUpdate = (productId: string, newName: string) => {
//     if (editingProduct && editingProduct.id === productId) {
//       const updatedProduct = { ...editingProduct, name: newName };
//       setEditingProduct(updatedProduct);
//     }
//   };

//   const handlePriceUpdate = (productId: string, newPrice: number) => {
//     if (editingProduct && editingProduct.id === productId) {
//       const updatedProduct = { ...editingProduct, price: newPrice };
//       setEditingProduct(updatedProduct);
//     }
//   };

//   const handleStockUpdate = (productId: string, newStock: number) => {
//     const updatedProduct = products.find((p) => p.id === productId);
//     if (updatedProduct) {
//       const newProduct = { ...updatedProduct, stock: newStock };
//       onProductUpdate(newProduct);
//       setEditingProduct(newProduct);
//     }
//   };

//   const handleRemoveDiscount = (productId: string, index: number) => {
//     const updatedProduct = products.find((p) => p.id === productId);
//     if (updatedProduct) {
//       const newProduct = {
//         ...updatedProduct,
//         discounts: updatedProduct.discounts.filter((_, i) => i !== index),
//       };
//       onProductUpdate(newProduct);
//       setEditingProduct(newProduct);
//     }
//   };

//   return <></>;
// };
