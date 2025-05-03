import { useState } from "react";
import { Product } from "@/types";
import { initialNewProducts } from "@r/constants";

interface handleProps {
  addProduct: (newProduct: Product) => void;
  setShowNewProductForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useNewProduct = () => {
  const [newProduct, setNewProduct] =
    useState<Omit<Product, "id">>(initialNewProducts);

  const handleAddNewProduct = ({
    addProduct,
    setShowNewProductForm,
  }: handleProps) => {
    //시간으로 id 설정
    const productWithId = { ...newProduct, id: Date.now().toString() };

    addProduct(productWithId); //전역적으로 새로운 상품을 추가
    setNewProduct(initialNewProducts);
    setShowNewProductForm(false); //새 상품 추가 후, 폼 닫기
  };

  return { newProduct, setNewProduct, handleAddNewProduct };
};
