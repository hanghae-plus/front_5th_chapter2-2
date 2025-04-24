import { useState } from "react";

export const useForm = <T>(initialValues: T) => {
  const [formValues, setFormValues] = useState<T>(initialValues);

  const handleFormChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleFormReset = () => {
    setFormValues(initialValues);
  };

  return {
    formValues,
    handleFormChange,
    handleFormReset,
  };
};
