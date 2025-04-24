import { Product } from "../../../../types";
import { useProductManagement } from "../../../contexts/ProductManagementContext";
import { useHandleInputChange } from "../../../hooks/common";

interface ProductManagementItemEditFormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  field: "name" | "price" | "stock";
  type?: "number" | "text";
}

export const ProductManagementItemEditFormInput = ({
  field,
  label,
  onChange,
  type = "number",
  ...props
}: ProductManagementItemEditFormInputProps) => {
  const { editingProduct } = useProductManagement();
  const { handleInputChange } = useHandleInputChange(onChange);

  if (!editingProduct) return null;

  return (
    <div className="mb-4">
      <label className="block mb-1">{label}: </label>
      <input
        type={type}
        value={editingProduct[field as keyof Product] as string | number}
        onChange={handleInputChange(field)}
        className="w-full p-2 border rounded"
        {...props}
      />
    </div>
  );
};
