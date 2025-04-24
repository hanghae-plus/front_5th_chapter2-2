export type SelectOption<T = any> = {
  label: string
  value: string
  data?: T
}

interface ISelect<T = any> {
  options: SelectOption<T>[]
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>, selectedData?: T) => void
  className?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  name?: string
  id?: string
}

export default function Select<T>({
  options,
  value = "",
  onChange,
  className = "w-full p-2 border rounded",
  placeholder,
  disabled = false,
  required = false,
  name,
  id,
}: ISelect<T>) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      const selectedValue = e.target.value
      const selectedOption = options.find((option) => option.value === selectedValue)
      onChange(e, selectedOption?.data)
    }
  }

  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={handleChange}
      className={className}
      disabled={disabled}
      required={required}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
