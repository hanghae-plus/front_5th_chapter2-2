import { useValidation } from "./useValidation";
import { ValidationField } from "./useValidation";

export const useHandleInputChange = (
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
) => {
  const { withValidation } = useValidation();

  const handleInputChange = (field: ValidationField) =>
    withValidation(field, (value) => {
      onChange?.({ target: { value } } as any);
    });

  return { handleInputChange };
};
