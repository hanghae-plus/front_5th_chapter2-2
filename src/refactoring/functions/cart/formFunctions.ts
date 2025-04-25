import { ChangeEvent } from 'react';

/**
 * 폼 유효성 검사 함수 타입
 */
export type ValidatorFn<T> = (values: T) => Partial<Record<keyof T, string>>;

/**
 * 모든 필드를 터치된 상태로 표시
 * @param values 폼 값 객체
 * @returns 모든 필드가 터치된 상태 객체
 */
export const createAllTouchedFields = <T extends Record<string, any>>(values: T): Record<keyof T, boolean> => {
  return Object.keys(values).reduce((acc, key) => {
    acc[key as keyof T] = true;
    return acc;
  }, {} as Record<keyof T, boolean>);
};

/**
 * 입력 필드의 값을 추출
 * @param event 변경 이벤트
 * @returns 변경된 필드 값
 */
export const extractFieldValue = (
  e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
): any => {
  const { type } = e.target;
  return type === 'checkbox' 
    ? (e.target as HTMLInputElement).checked 
    : e.target.value;
};

/**
 * 폼 값 객체에서 특정 필드 업데이트
 * @param values 기존 폼 값 객체
 * @param fieldName 업데이트할 필드 이름
 * @param fieldValue 새 필드 값
 * @returns 업데이트된 폼 값 객체
 */
export const updateFormField = <T extends Record<string, any>>(
  values: T, 
  fieldName: keyof T, 
  fieldValue: any
): T => {
  return {
    ...values,
    [fieldName]: fieldValue
  };
};

/**
 * 터치된 필드 상태 업데이트
 * @param touchedFields 현재 터치된 필드 상태
 * @param fieldName 터치된 필드 이름
 * @returns 업데이트된 터치 상태 객체
 */
export const updateTouchedField = <T extends Record<string, any>>(
  touchedFields: Partial<Record<keyof T, boolean>>,
  fieldName: keyof T
): Partial<Record<keyof T, boolean>> => {
  return {
    ...touchedFields,
    [fieldName]: true
  };
}; 