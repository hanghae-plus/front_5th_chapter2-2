import { Input } from "./Input";

type Props = {
  id: string;
  type?: "text" | "number";
  label: string;
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

// 재사용 가능한 컴포넌트
export const LabelInput = ({ id, type = "text", label, value, onChange }: Props) => {
  return (
    <div className="mb-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <Input id={id} type={type} value={value} onChange={onChange} />
    </div>
  );
};
