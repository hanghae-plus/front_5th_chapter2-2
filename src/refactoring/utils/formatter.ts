export const formatCurrency = (amount: number, unit: string = "원") =>
  `${amount.toLocaleString("ko-KR")}${unit}`;

export const formatPercent = (value: number) => `${value}%`;
