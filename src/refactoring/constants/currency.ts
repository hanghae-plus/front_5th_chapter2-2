export const CURRENCY = {
  KRW: {
    code: 'KRW',
    symbol: '원',
    position: 'suffix' as const, // 'prefix' | 'suffix'
    locale: 'ko-KR',
  },
  USD: {
    code: 'USD',
    symbol: '$',
    position: 'prefix' as const,
    locale: 'en-US',
  },
} as const;
