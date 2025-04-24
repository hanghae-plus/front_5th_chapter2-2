export const formatCurrency = (
  num: number,
  locale = "ko-KR",
  useSymbol: boolean = false,
  currency = "KRW"
) => {
  return num.toLocaleString(
    locale,
    useSymbol
      ? {
          style: "currency",
          currency,
        }
      : undefined
  );
};
