import { useState } from "react";
import { ProductFormData } from "../../../6_shared/types";

const initialFormData: ProductFormData = {
  name: "",
  price: 0,
  stock: 0,
  discounts: [],
};

export const useProductForm = () => {
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      price: parseInt(e.target.value),
    }));
  };

  const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      stock: parseInt(e.target.value),
    }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  return {
    formData,
    handleNameChange,
    handlePriceChange,
    handleStockChange,
    resetForm,
  };
};
