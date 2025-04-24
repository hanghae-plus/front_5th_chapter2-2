import { ChangeEvent } from "react";

type InputType = "text" | "number" | "email" | "password";

type FormInputProps = {
  id?: string;
  label?: string;
  type?: InputType;
  value?: string | number;
  onChange?: (value: string | number) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  labelClassName?: string;
  containerClassName?: string;
};

/**
 * 재사용 가능한 폼 입력 컴포넌트
 * 라벨과 입력 필드를 포함하며 다양한 타입의 입력을 지원합니다.
 */
export const FormInput = ({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  required = false,
  className,
  labelClassName = "block text-sm font-medium text-gray-700",
  containerClassName = "mb-2",
}: FormInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return;

    const newValue =
      type === "number"
        ? e.target.value
          ? parseInt(e.target.value)
          : 0
        : e.target.value;

    onChange(newValue);
  };

  return (
    <div className={containerClassName}>
      {label && (
        <label htmlFor={id} className={labelClassName}>
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        className={className || "w-full p-2 border rounded"}
      />
    </div>
  );
};
