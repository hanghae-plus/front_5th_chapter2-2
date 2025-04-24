export const formatPriceWithDollar = (price: number) => {
  return price.toLocaleString("kr", { style: "currency", currency: "KRW" });
};
