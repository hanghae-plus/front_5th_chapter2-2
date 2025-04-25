import { useState, useCallback, ChangeEvent } from 'react';
import { 
  ValidatorFn, 
  createAllTouchedFields, 
  extractFieldValue, 
  updateFormField, 
  updateTouchedField 
} from '../../functions/cart/formFunctions';

/**
 * 커스텀 폼 훅 매개변수
 */
interface UseFormProps<T extends Record<string, any>> {
  initialValues: T;
  onSubmit: (values: T) => void;
  validate?: ValidatorFn<T>;
}

/**
 * 커스텀 폼 훅 반환 타입
 */
interface UseFormReturn<T extends Record<string, any>> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleBlur: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setFieldValue: (name: keyof T, value: any) => void;
  resetForm: () => void;
}

/**
 * 폼 상태 관리를 위한 커스텀 훅
 * @param props 초기값, 제출 함수, 유효성 검사 함수
 * @returns 폼 상태와 관련 함수들
 */
export function useForm<T extends Record<string, any>>({
  initialValues,
  onSubmit,
  validate
}: UseFormProps<T>): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  /**
   * 폼 유효성 검사
   */
  const validateForm = useCallback(() => {
    if (!validate) return {};
    return validate(values);
  }, [validate, values]);

  /**
   * 입력 필드 변경 핸들러
   */
  const handleChange = useCallback((
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    const fieldValue = extractFieldValue(e);
    setValues(prev => updateFormField(prev, name as keyof T, fieldValue));
  }, []);

  /**
   * 필드 값 직접 설정
   */
  const setFieldValue = useCallback((name: keyof T, value: any) => {
    setValues(prev => updateFormField(prev, name, value));
  }, []);

  /**
   * 필드 포커스 아웃 핸들러
   */
  const handleBlur = useCallback((
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    
    setTouched(prev => updateTouchedField(prev, name as keyof T));
    
    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);
    }
  }, [validate, values]);

  /**
   * 폼 제출 핸들러
   */
  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    setErrors(validationErrors);
    
    // 모든 필드를 터치된 상태로 표시
    const allTouched = createAllTouchedFields(values);
    setTouched(allTouched);
    
    // 유효성 검사 오류가 없을 경우 제출
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      
      try {
        onSubmit(values);
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [onSubmit, validateForm, values]);

  /**
   * 폼 초기화
   */
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    resetForm
  };
} 