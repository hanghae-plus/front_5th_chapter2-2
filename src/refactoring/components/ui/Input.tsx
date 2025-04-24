import { InputHTMLAttributes } from "react"

export enum InputType {
  Text = "text",
  Number = "number",
}

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  id?: string
  label?: string
  labelClassName?: string
  className?: string
  type?: InputType
}

export default function Input({
  id,
  label = "",
  labelClassName,
  className,
  type = InputType.Text,
  placeholder = "",
  value,
  onChange,
  ...props
}: IInput) {
  return (
    <>
      {label ? (
        <label htmlFor={id} className={labelClassName}>
          {label}
        </label>
      ) : null}
      <input
        id={id}
        className={className}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
        {...props}
      />
    </>
  )
}
