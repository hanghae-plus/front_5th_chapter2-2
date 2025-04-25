import { useState } from "react";
import { CouponFormData } from "../types";

const initialFormData: CouponFormData = {
  name: "",
  code: "",
  discountType: "percentage",
  discountValue: 0,
};

export const useCouponForm = () => {
  const [formData, setFormData] = useState<CouponFormData>(initialFormData);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, code: e.target.value }));
  };

  const handleDiscountTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      discountType: e.target.value as "amount" | "percentage",
    }));
  };

  const handleDiscountValueChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      discountValue: parseInt(e.target.value),
    }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  return {
    formData,
    handleNameChange,
    handleCodeChange,
    handleDiscountTypeChange,
    handleDiscountValueChange,
    resetForm,
  };
};
