export interface Currency {
  code: string;
  symbol: string;
  flag: string;
  name: string;
  country: string;
}

export const currencies: Currency[] = [
  { code: 'USD', symbol: '$', flag: '🇺🇸', name: 'US Dollar', country: 'United States' },
  { code: 'EUR', symbol: '€', flag: '🇪🇺', name: 'Euro', country: 'European Union' },
  { code: 'GBP', symbol: '£', flag: '🇬🇧', name: 'British Pound', country: 'United Kingdom' },
  { code: 'JPY', symbol: '¥', flag: '🇯🇵', name: 'Japanese Yen', country: 'Japan' },
  { code: 'CHF', symbol: 'Fr', flag: '🇨🇭', name: 'Swiss Franc', country: 'Switzerland' },
  { code: 'CAD', symbol: 'C$', flag: '🇨🇦', name: 'Canadian Dollar', country: 'Canada' },
  { code: 'AUD', symbol: 'A$', flag: '🇦🇺', name: 'Australian Dollar', country: 'Australia' },
  { code: 'CNY', symbol: '¥', flag: '🇨🇳', name: 'Chinese Yuan', country: 'China' },
  { code: 'INR', symbol: '₹', flag: '🇮🇳', name: 'Indian Rupee', country: 'India' },
  { code: 'MXN', symbol: 'Mex$', flag: '🇲🇽', name: 'Mexican Peso', country: 'Mexico' },
  { code: 'BRL', symbol: 'R$', flag: '🇧🇷', name: 'Brazilian Real', country: 'Brazil' },
  { code: 'KRW', symbol: '₩', flag: '🇰🇷', name: 'South Korean Won', country: 'South Korea' },
  { code: 'SEK', symbol: 'kr', flag: '🇸🇪', name: 'Swedish Krona', country: 'Sweden' },
  { code: 'NOK', symbol: 'kr', flag: '🇳🇴', name: 'Norwegian Krone', country: 'Norway' },
  { code: 'DKK', symbol: 'kr', flag: '🇩🇰', name: 'Danish Krone', country: 'Denmark' },
  { code: 'SGD', symbol: 'S$', flag: '🇸🇬', name: 'Singapore Dollar', country: 'Singapore' },
  { code: 'HKD', symbol: 'HK$', flag: '🇭🇰', name: 'Hong Kong Dollar', country: 'Hong Kong' },
  { code: 'NZD', symbol: 'NZ$', flag: '🇳🇿', name: 'New Zealand Dollar', country: 'New Zealand' },
  { code: 'ZAR', symbol: 'R', flag: '🇿🇦', name: 'South African Rand', country: 'South Africa' },
  { code: 'TRY', symbol: '₺', flag: '🇹🇷', name: 'Turkish Lira', country: 'Turkey' },
  { code: 'PLN', symbol: 'zł', flag: '🇵🇱', name: 'Polish Zloty', country: 'Poland' },
  { code: 'THB', symbol: '฿', flag: '🇹🇭', name: 'Thai Baht', country: 'Thailand' },
  { code: 'IDR', symbol: 'Rp', flag: '🇮🇩', name: 'Indonesian Rupiah', country: 'Indonesia' },
  { code: 'CZK', symbol: 'Kč', flag: '🇨🇿', name: 'Czech Koruna', country: 'Czech Republic' },
  { code: 'ILS', symbol: '₪', flag: '🇮🇱', name: 'Israeli Shekel', country: 'Israel' },
  { code: 'PHP', symbol: '₱', flag: '🇵🇭', name: 'Philippine Peso', country: 'Philippines' },
  { code: 'MYR', symbol: 'RM', flag: '🇲🇾', name: 'Malaysian Ringgit', country: 'Malaysia' },
  { code: 'HUF', symbol: 'Ft', flag: '🇭🇺', name: 'Hungarian Forint', country: 'Hungary' },
  { code: 'RON', symbol: 'lei', flag: '🇷🇴', name: 'Romanian Leu', country: 'Romania' },
  { code: 'ISK', symbol: 'kr', flag: '🇮🇸', name: 'Icelandic Króna', country: 'Iceland' },
];

// Mock exchange rates relative to USD
export const mockRatesUSD: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.5,
  CHF: 0.88,
  CAD: 1.36,
  AUD: 1.53,
  CNY: 7.24,
  INR: 83.1,
  MXN: 17.15,
  BRL: 4.97,
  KRW: 1325,
  SEK: 10.42,
  NOK: 10.55,
  DKK: 6.87,
  SGD: 1.34,
  HKD: 7.82,
  NZD: 1.63,
  ZAR: 18.6,
  TRY: 30.2,
  PLN: 4.02,
  THB: 35.1,
  IDR: 15650,
  CZK: 22.8,
  ILS: 3.67,
  PHP: 55.8,
  MYR: 4.65,
  HUF: 355,
  RON: 4.58,
  ISK: 137.5,
};

export function getExchangeRate(from: string, to: string): number {
  const fromRate = mockRatesUSD[from] || 1;
  const toRate = mockRatesUSD[to] || 1;
  return toRate / fromRate;
}

export function generateChartData(from: string, to: string, days: number = 30) {
  const baseRate = getExchangeRate(from, to);
  const data = [];
  const now = new Date();
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const variation = (Math.random() - 0.5) * 0.06 * baseRate;
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      rate: +(baseRate + variation).toFixed(6),
    });
  }
  return data;
}

export interface CurrencyPair {
  id: string;
  from: Currency;
  to: Currency;
}

export interface ConversionRow {
  id: string;
  fromAmount: string;
  toAmount: string;
}
