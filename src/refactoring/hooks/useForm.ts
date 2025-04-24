import { useState } from "react";

export interface UseFormReturn<T> {
  values: T;
  handleChange: <K extends keyof T>(field: K) => (value: T[K]) => void;
  reset: (initialValues?: T) => void;
  setFormValues: (values: T) => void;
}

/**
 * 일반적인 폼 상태 관리를 위한 커스텀 훅입니다.
 * 폼 값 관리와 값 변경, 초기화 등의 기능을 제공합니다.
 */
export const useForm = <T>(initialValues: T): UseFormReturn<T> => {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange =
    <K extends keyof T>(field: K) =>
    (value: T[K]) => {
      setValues((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  const reset = (resetValues?: T) => {
    setValues(resetValues ?? initialValues);
  };

  const setFormValues = (newValues: T) => {
    setValues((prevValues) => ({ ...prevValues, ...newValues }));
  };

  return {
    values,
    handleChange,
    reset,
    setFormValues,
  };
};
