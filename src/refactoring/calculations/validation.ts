import { ValidationField } from "../hooks/common/useValidation";

type ValidationResult = {
  isValid: boolean;
  message?: string;
};

export const validateInput = (
  field: ValidationField,
  value: string | number
): ValidationResult => {
  switch (field) {
    case "price":
      const price = Number(value);
      if (isNaN(price)) {
        return { isValid: false, message: "숫자를 입력해주세요." };
      }
      if (price < 0) {
        return { isValid: false, message: "0 이상의 값을 입력해주세요." };
      }
      if (price > 1000000000) {
        return { isValid: false, message: "10억 이하의 값을 입력해주세요." };
      }
      return { isValid: true };

    case "stock":
      const stock = Number(value);
      if (isNaN(stock)) {
        return { isValid: false, message: "숫자를 입력해주세요." };
      }
      if (!Number.isInteger(stock)) {
        return { isValid: false, message: "정수를 입력해주세요." };
      }
      if (stock < 0) {
        return { isValid: false, message: "0 이상의 값을 입력해주세요." };
      }
      if (stock > 10000) {
        return { isValid: false, message: "10000 이하의 값을 입력해주세요." };
      }
      return { isValid: true };

    case "quantity":
      const quantity = Number(value);
      if (isNaN(quantity)) {
        return { isValid: false, message: "숫자를 입력해주세요." };
      }
      if (!Number.isInteger(quantity)) {
        return { isValid: false, message: "정수를 입력해주세요." };
      }
      if (quantity <= 0) {
        return { isValid: false, message: "1 이상의 값을 입력해주세요." };
      }
      return { isValid: true };

    case "rate":
      const rate = Number(value);
      if (isNaN(rate)) {
        return { isValid: false, message: "숫자를 입력해주세요." };
      }
      if (rate <= 0) {
        return { isValid: false, message: "0보다 큰 값을 입력해주세요." };
      }
      if (rate > 100) {
        return { isValid: false, message: "100 이하의 값을 입력해주세요." };
      }
      return { isValid: true };

    case "discountValue":
      const discountValue = Number(value);
      if (isNaN(discountValue)) {
        return { isValid: false, message: "숫자를 입력해주세요." };
      }
      if (discountValue < 0) {
        return { isValid: false, message: "0 이상의 값을 입력해주세요." };
      }
      if (discountValue > 1000000000) {
        return { isValid: false, message: "10억 이하의 값을 입력해주세요." };
      }
      return { isValid: true };

    default:
      return { isValid: true };
  }
};
