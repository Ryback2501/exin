const BASE_URL = 'https://api.frankfurter.dev/v1';

export async function fetchPairRate(from: string, to: string): Promise<number> {
  const res = await fetch(`${BASE_URL}/latest?base=${from}&symbols=${to}`);
  if (!res.ok) throw new Error(`Frankfurter error: ${res.status}`);
  const data = await res.json();
  return data.rates[to];
}

export async function fetchLatestRates(base: string): Promise<Record<string, number>> {
  const res = await fetch(`${BASE_URL}/latest?base=${base}`);
  if (!res.ok) throw new Error(`Frankfurter error: ${res.status}`);
  const data = await res.json();
  return data.rates;
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
    start.setFullYear(1999, 0, 4); // Frankfurter data starts 1999-01-04
  }

  const fmt = (d: Date) => d.toISOString().slice(0, 10);
  const url = `${BASE_URL}/${fmt(start)}..${fmt(end)}?base=${from}&symbols=${to}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Frankfurter error: ${res.status}`);
  const data = await res.json();

  return Object.entries(data.rates as Record<string, Record<string, number>>)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([dateStr, rates]) => ({
      date: new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      rate: +(rates[to]).toFixed(6),
    }));
}
