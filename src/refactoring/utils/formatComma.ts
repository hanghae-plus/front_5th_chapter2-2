export const formatComma = (price: string) => {
  const priceNumber = Number(price);

  if (isNaN(priceNumber)) {
    return price;
  }
  return priceNumber.toLocaleString('ko-KR');
};
