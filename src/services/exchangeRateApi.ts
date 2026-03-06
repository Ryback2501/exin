const API_KEY = '88c4c0f5268508a68c485f0b7c0bc0b8';
const BASE_URL = 'https://api.exchangerate.host';

export interface PairResponse {
  result: string;
  conversion_rate: number;
  time_last_update_utc: string;
}

export async function fetchPairRate(from: string, to: string): Promise<number> {
  const res = await fetch(`${BASE_URL}/live?access_key=${API_KEY}&source=${from}&currencies=${to}`);
  if (!res.ok) throw new Error(`exchangerate.host error: ${res.status}`);
  const data = await res.json();
  if (!data.success) throw new Error('exchangerate.host request failed');
  const key = `${from}${to}`;
  return data.quotes[key];
}

export interface LatestRatesResponse {
  result: string;
  conversion_rates: Record<string, number>;
}

export async function fetchLatestRates(base: string): Promise<Record<string, number>> {
  const res = await fetch(`${BASE_URL}/live?access_key=${API_KEY}&source=${base}`);
  if (!res.ok) throw new Error(`exchangerate.host error: ${res.status}`);
  const data = await res.json();
  if (!data.success) throw new Error('exchangerate.host request failed');
  const rates: Record<string, number> = {};
  for (const [key, value] of Object.entries(data.quotes)) {
    rates[key.slice(base.length)] = value as number;
  }
  return rates;
}

export interface HistoricalPoint {
  date: string;
  rate: number;
}

export async function fetchHistoricalRates(
  from: string,
  to: string,
  days: number = 30
): Promise<HistoricalPoint[]> {
  const end = new Date();
  const start = new Date();
  if (days > 0) {
    start.setDate(start.getDate() - days);
  } else {
    start.setFullYear(2000, 0, 1); // "All time"
  }

  const fmt = (d: Date) => d.toISOString().slice(0, 10);
  const url = `${BASE_URL}/timeframe?access_key=${API_KEY}&start_date=${fmt(start)}&end_date=${fmt(end)}&source=${from}&currencies=${to}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`exchangerate.host error: ${res.status}`);
  const data = await res.json();
  if (!data.success) throw new Error('exchangerate.host historical request failed');

  const key = `${from}${to}`;
  return Object.entries(data.quotes as Record<string, Record<string, number>>)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([dateStr, rates]) => ({
      date: new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      rate: +(rates[key]).toFixed(6),
    }));
}
