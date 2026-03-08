const CDN_BASE = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api';
const FALLBACK_BASE = 'https://currency-api.pages.dev';

async function fetchWithFallback(date: string, endpoint: string): Promise<any> {
  const cdnUrl = `${CDN_BASE}@${date}/v1/${endpoint}`;
  try {
    const res = await fetch(cdnUrl);
    if (res.ok) return res.json();
  } catch {}
  // Fallback
  const fallbackUrl = `https://${date}.${FALLBACK_BASE.replace('https://', '')}/v1/${endpoint}`;
  const res = await fetch(fallbackUrl);
  if (!res.ok) throw new Error(`Currency API error: ${res.status}`);
  return res.json();
}

export async function fetchPairRate(from: string, to: string): Promise<number> {
  const f = from.toLowerCase();
  const t = to.toLowerCase();
  const data = await fetchWithFallback('latest', `currencies/${f}.min.json`);
  return data[f][t];
}

export async function fetchLatestRates(base: string): Promise<Record<string, number>> {
  const b = base.toLowerCase();
  const data = await fetchWithFallback('latest', `currencies/${b}.min.json`);
  return data[b];
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
  const f = from.toLowerCase();
  const t = to.toLowerCase();
  const end = new Date();
  const start = new Date();

  if (days > 0) {
    start.setDate(start.getDate() - days);
  } else {
    // API data goes back ~2 years on jsdelivr
    start.setFullYear(end.getFullYear() - 2);
  }

  // Sample dates to avoid too many requests
  const dates: string[] = [];
  const totalDays = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const maxPoints = 60;
  const step = Math.max(1, Math.floor(totalDays / maxPoints));

  for (let i = 0; i <= totalDays; i += step) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    if (d <= end) {
      dates.push(d.toISOString().slice(0, 10));
    }
  }
  // Always include the last date
  const lastDate = end.toISOString().slice(0, 10);
  if (!dates.includes(lastDate)) dates.push(lastDate);

  // Fetch all dates in parallel (batched to avoid overwhelming)
  const batchSize = 10;
  const results: HistoricalPoint[] = [];

  for (let i = 0; i < dates.length; i += batchSize) {
    const batch = dates.slice(i, i + batchSize);
    const batchResults = await Promise.allSettled(
      batch.map(async (dateStr) => {
        const data = await fetchWithFallback(dateStr, `currencies/${f}.min.json`);
        return {
          date: new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          rate: +(data[f][t]).toFixed(6),
        };
      })
    );
    for (const r of batchResults) {
      if (r.status === 'fulfilled') results.push(r.value);
    }
  }

  return results;
}
