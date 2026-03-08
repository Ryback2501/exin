export interface Currency {
  code: string;
  symbol: string;
  flag: string;
  name: string;
  country: string;
}

export const currencies: Currency[] = [
  // Major currencies
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
  // Additional fiat currencies
  { code: 'AED', symbol: 'د.إ', flag: '🇦🇪', name: 'Emirati Dirham', country: 'UAE' },
  { code: 'ARS', symbol: 'AR$', flag: '🇦🇷', name: 'Argentine Peso', country: 'Argentina' },
  { code: 'BGN', symbol: 'лв', flag: '🇧🇬', name: 'Bulgarian Lev', country: 'Bulgaria' },
  { code: 'BHD', symbol: 'BD', flag: '🇧🇭', name: 'Bahraini Dinar', country: 'Bahrain' },
  { code: 'CLP', symbol: 'CL$', flag: '🇨🇱', name: 'Chilean Peso', country: 'Chile' },
  { code: 'COP', symbol: 'CO$', flag: '🇨🇴', name: 'Colombian Peso', country: 'Colombia' },
  { code: 'CRC', symbol: '₡', flag: '🇨🇷', name: 'Costa Rican Colón', country: 'Costa Rica' },
  { code: 'DZD', symbol: 'د.ج', flag: '🇩🇿', name: 'Algerian Dinar', country: 'Algeria' },
  { code: 'EGP', symbol: 'E£', flag: '🇪🇬', name: 'Egyptian Pound', country: 'Egypt' },
  { code: 'GEL', symbol: '₾', flag: '🇬🇪', name: 'Georgian Lari', country: 'Georgia' },
  { code: 'GHS', symbol: 'GH₵', flag: '🇬🇭', name: 'Ghanaian Cedi', country: 'Ghana' },
  { code: 'HRK', symbol: 'kn', flag: '🇭🇷', name: 'Croatian Kuna', country: 'Croatia' },
  { code: 'JOD', symbol: 'JD', flag: '🇯🇴', name: 'Jordanian Dinar', country: 'Jordan' },
  { code: 'KES', symbol: 'KSh', flag: '🇰🇪', name: 'Kenyan Shilling', country: 'Kenya' },
  { code: 'KWD', symbol: 'KD', flag: '🇰🇼', name: 'Kuwaiti Dinar', country: 'Kuwait' },
  { code: 'KZT', symbol: '₸', flag: '🇰🇿', name: 'Kazakhstani Tenge', country: 'Kazakhstan' },
  { code: 'LKR', symbol: 'Rs', flag: '🇱🇰', name: 'Sri Lankan Rupee', country: 'Sri Lanka' },
  { code: 'MAD', symbol: 'MAD', flag: '🇲🇦', name: 'Moroccan Dirham', country: 'Morocco' },
  { code: 'NGN', symbol: '₦', flag: '🇳🇬', name: 'Nigerian Naira', country: 'Nigeria' },
  { code: 'OMR', symbol: 'OMR', flag: '🇴🇲', name: 'Omani Rial', country: 'Oman' },
  { code: 'PEN', symbol: 'S/', flag: '🇵🇪', name: 'Peruvian Sol', country: 'Peru' },
  { code: 'PKR', symbol: '₨', flag: '🇵🇰', name: 'Pakistani Rupee', country: 'Pakistan' },
  { code: 'QAR', symbol: 'QR', flag: '🇶🇦', name: 'Qatari Riyal', country: 'Qatar' },
  { code: 'RSD', symbol: 'din', flag: '🇷🇸', name: 'Serbian Dinar', country: 'Serbia' },
  { code: 'RUB', symbol: '₽', flag: '🇷🇺', name: 'Russian Ruble', country: 'Russia' },
  { code: 'SAR', symbol: 'SR', flag: '🇸🇦', name: 'Saudi Riyal', country: 'Saudi Arabia' },
  { code: 'TWD', symbol: 'NT$', flag: '🇹🇼', name: 'Taiwan Dollar', country: 'Taiwan' },
  { code: 'UAH', symbol: '₴', flag: '🇺🇦', name: 'Ukrainian Hryvnia', country: 'Ukraine' },
  { code: 'UYU', symbol: '$U', flag: '🇺🇾', name: 'Uruguayan Peso', country: 'Uruguay' },
  { code: 'VND', symbol: '₫', flag: '🇻🇳', name: 'Vietnamese Dong', country: 'Vietnam' },
  // Cryptocurrencies
  { code: 'BTC', symbol: '₿', flag: '🪙', name: 'Bitcoin', country: 'Crypto' },
  { code: 'ETH', symbol: 'Ξ', flag: '🪙', name: 'Ethereum', country: 'Crypto' },
  { code: 'XRP', symbol: 'XRP', flag: '🪙', name: 'Ripple', country: 'Crypto' },
  { code: 'SOL', symbol: 'SOL', flag: '🪙', name: 'Solana', country: 'Crypto' },
  { code: 'DOGE', symbol: 'Ð', flag: '🪙', name: 'Dogecoin', country: 'Crypto' },
  // Metals
  { code: 'XAU', symbol: 'XAU', flag: '🥇', name: 'Gold (oz)', country: 'Metal' },
  { code: 'XAG', symbol: 'XAG', flag: '🥈', name: 'Silver (oz)', country: 'Metal' },
];

// Mock exchange rates relative to USD (fallback)
export const mockRatesUSD: Record<string, number> = {
  USD: 1, EUR: 0.86, GBP: 0.75, JPY: 158, CHF: 0.78, CAD: 1.36, AUD: 1.42,
  CNY: 6.90, INR: 92, MXN: 17.84, BRL: 5.26, KRW: 1482, SEK: 9.18, NOK: 9.58,
  DKK: 6.43, SGD: 1.28, HKD: 7.82, NZD: 1.70, ZAR: 16.56, TRY: 44.06,
  PLN: 3.67, THB: 31.78, IDR: 16909, CZK: 21.01, ILS: 3.08, PHP: 59.03,
  MYR: 3.95, HUF: 338, RON: 4.39, ISK: 125, AED: 3.67, ARS: 1417,
  BGN: 1.68, BHD: 0.376, CLP: 912, COP: 3782, CRC: 476, DZD: 131,
  EGP: 50.22, GEL: 2.73, GHS: 10.77, HRK: 6.48, JOD: 0.709, KES: 129,
  KWD: 0.307, KZT: 494, LKR: 311, MAD: 9.30, NGN: 1392, OMR: 0.385,
  PEN: 3.48, PKR: 280, QAR: 3.64, RSD: 101, RUB: 79, SAR: 3.75,
  TWD: 31.82, UAH: 43.76, UYU: 40.23, VND: 26221,
  BTC: 0.0000149, ETH: 0.000509, XRP: 0.739, SOL: 0.0121, DOGE: 11.14,
  XAU: 0.000193, XAG: 0.01183,
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
