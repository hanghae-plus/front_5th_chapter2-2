import { validateInput } from "../../calculations/validation";

export type ValidationField =
  | "name"
  | "price"
  | "stock"
  | "quantity"
  | "rate"
  | "code"
  | "discountValue";

export const useValidation = () => {
  const withValidation =
    (field: ValidationField, handler: (value: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const result = validateInput(field, e.target.value);
      if (!result.isValid && result.message) {
        alert(result.message);
        return;
      }
      handler(e.target.value);
    };

  return { withValidation };
};
