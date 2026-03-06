const API_KEY = '524107f677859f5564896093';
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}`;

export interface PairResponse {
  result: string;
  conversion_rate: number;
  time_last_update_utc: string;
}

export async function fetchPairRate(from: string, to: string): Promise<number> {
  const res = await fetch(`${BASE_URL}/pair/${from}/${to}`);
  if (!res.ok) throw new Error(`ExchangeRate-API error: ${res.status}`);
  const data: PairResponse = await res.json();
  if (data.result !== 'success') throw new Error('ExchangeRate-API request failed');
  return data.conversion_rate;
}

export interface LatestRatesResponse {
  result: string;
  conversion_rates: Record<string, number>;
}

export async function fetchLatestRates(base: string): Promise<Record<string, number>> {
  const res = await fetch(`${BASE_URL}/latest/${base}`);
  if (!res.ok) throw new Error(`ExchangeRate-API error: ${res.status}`);
  const data: LatestRatesResponse = await res.json();
  if (data.result !== 'success') throw new Error('ExchangeRate-API request failed');
  return data.conversion_rates;
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
  start.setDate(start.getDate() - days);

  const fmt = (d: Date) => d.toISOString().slice(0, 10);
  const url = `https://api.frankfurter.app/${fmt(start)}..${fmt(end)}?from=${from}&to=${to}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Frankfurter API error: ${res.status}`);
  const data: { rates: Record<string, Record<string, number>> } = await res.json();

  return Object.entries(data.rates)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([dateStr, rates]) => ({
      date: new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      rate: +rates[to].toFixed(6),
    }));
}
