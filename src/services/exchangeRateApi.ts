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
