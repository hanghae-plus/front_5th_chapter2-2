export const checkCurrency = (value: number): boolean => {

    const isValid = /^\d+(\.\d{1,2})?$/.test(value.toString()) && parseFloat(value.toString()) % 100 === 0;

    return isValid;
}