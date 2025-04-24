import { Product } from "../../../../types";
import { useProductManagement } from "../../../contexts/ProductManagementContext";

interface ProductManagementItemEditInputProps {
  productId: string;
  label: string;
  field: "name" | "price" | "stock";
  type?: "number" | "text";
}

export const ProductManagementItemEditInput = ({
  productId,
  field,
  label,
  type = "number",
}: ProductManagementItemEditInputProps) => {
  const { editingProduct, handleFieldUpdate } = useProductManagement();
  if (!editingProduct) return null;

  return (
    <div className="mb-4">
      <label className="block mb-1">{label}: </label>
      <input
        type={type}
        value={editingProduct[field as keyof Product] as string | number}
        onChange={(e) =>
          handleFieldUpdate(
            productId,
            field as keyof Product,
            type === "number" ? parseInt(e.target.value) : e.target.value
          )
        }
        className="w-full p-2 border rounded"
      />
    </div>
  );
};
