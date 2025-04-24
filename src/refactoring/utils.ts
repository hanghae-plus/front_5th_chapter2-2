export const hasEmptyValue = (obj: object) => {
  return Object.values(obj).some((value) => {
    if (typeof value === 'string') {
      return value === '';
    } else if (typeof value === 'number') {
      return value === 0;
    } else if (Array.isArray(value)) {
      return value.length === 0;
    } else if (value === null || value === undefined) {
      return true;
    }
    return false;
  });
};

export const validateFields = <T extends object>(
  fields: T,
  message: string,
) => {
  const result = hasEmptyValue(fields);

  if (result) {
    alert(message);
  }

  return result;
};
