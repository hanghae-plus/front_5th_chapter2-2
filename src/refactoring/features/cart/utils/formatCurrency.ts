import { CURRENCY } from "@/constants";

interface FormatCurrencyOptions {
  currency?: keyof typeof CURRENCY;
  locale?: string;
}

export const formatCurrency = (
  amount: number,
  options: FormatCurrencyOptions = {},
): string => {
  const { currency = 'KRW', locale = CURRENCY[currency].locale } = options;

  const formattedNumber = new Intl.NumberFormat(locale, {
    style: 'decimal',
  }).format(amount);

  const { symbol, position } = CURRENCY[currency];

  return position === 'prefix'
    ? `${symbol}${formattedNumber}`
    : `${formattedNumber}${symbol}`;
};
