// // import { useState } from "react";
// import { Product } from "../../types";

// interface useProductManagementProps {
//     // onProductUpdate: (updatedProduct: Product) => void;
//     onProductAdd: (newProduct: Product) => void;
// }

// export const useProductManagement = ({onProductAdd}: useProductManagementProps) => {
//     // const [openProductIds, setOpenProductIds] = useState<Set<string>>(new Set());
//     // const [editingProduct, setEditingProduct] = useState<Product | null>(null);
//     // const [showNewProductForm, setShowNewProductForm] = useState(false);
//     // const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
//     //     name: "",
//     //     price: 0,
//     //     stock: 0,
//     //     discounts: [],
//     //   });

//     //   const toggleProductAccordion = (productId: string) => {
//     //     setOpenProductIds((prev) => {
//     //       const newSet = new Set(prev);
//     //       if (newSet.has(productId)) {
//     //         newSet.delete(productId);
//     //       } else {
//     //         newSet.add(productId);
//     //       }
//     //       return newSet;
//     //     });
//     //   };

//       // handleEditProduct 함수 수정
//     // const handleEditProduct = (product: Product) => {
//     //     setEditingProduct({ ...product });
//     // };

//     // const handleProductNameUpdate = (productId: string, newName: string) => {
//     //     if (editingProduct && editingProduct.id === productId) {
//     //       const updatedProduct = { ...editingProduct, name: newName };
//     //       setEditingProduct(updatedProduct);
//     //     }
//     //   };

//         // 새로운 핸들러 함수 추가
// //   const handlePriceUpdate = (productId: string, newPrice: number) => {
// //     if (editingProduct && editingProduct.id === productId) {
// //       const updatedProduct = { ...editingProduct, price: newPrice };
// //       setEditingProduct(updatedProduct);
// //     }
// //   };

// //   const handleEditComplete = () => {
// //     if (editingProduct) {
// //       onProductUpdate(editingProduct);
// //       setEditingProduct(null);
// //     }
// //   };

// //   const handleAddNewProduct = () => {
// //     const productWithId = { ...newProduct, id: Date.now().toString() };
// //     onProductAdd(productWithId);
// //     setNewProduct({
// //       name: "",
// //       price: 0,
// //       stock: 0,
// //       discounts: [],
// //     });
// //     setShowNewProductForm(false);
// //   };

//   return {
//     // openProductIds,
//     // editingProduct,
//     // setEditingProduct,
//     // showNewProductForm,
//     // setShowNewProductForm,
//     // newProduct,
//     // setNewProduct,
//     // toggleProductAccordion,
//     // handleEditProduct,
//     // handleProductNameUpdate,
//     // handlePriceUpdate,
//     // handleEditComplete,
//     // handleAddNewProduct,
//   };
// };