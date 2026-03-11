const CDN_BASE = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api';
const FALLBACK_BASE = 'https://currency-api.pages.dev';

type CurrencyApiResponse = Record<string, Record<string, number>>;

async function fetchWithFallback(date: string, endpoint: string): Promise<CurrencyApiResponse> {
  const cdnUrl = `${CDN_BASE}@${date}/v1/${endpoint}`;
  try {
    const res = await fetch(cdnUrl);
    if (res.ok) return res.json();
  } catch {
    // Ignore primary endpoint failures and continue with fallback.
  }
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

function getLastDayOfWeek(d: Date): Date {
  // Sunday as last day of the week
  const day = d.getDay();
  const diff = 7 - day;
  const result = new Date(d);
  result.setDate(result.getDate() + (day === 0 ? 0 : diff));
  return result;
}

function getLastDayOfMonth(year: number, month: number): Date {
  return new Date(year, month + 1, 0);
}

function buildDatesForPeriod(days: number, start: Date, end: Date): string[] {
  const today = end.toISOString().slice(0, 10);
  const dates: string[] = [];

  // Always include the start date first
  dates.push(start.toISOString().slice(0, 10));

  if (days === 365) {
    // 1Y: last day of each week (Sunday), ~52-53 points + today
    const cursor = new Date(start);
    let lastSunday = getLastDayOfWeek(cursor);
    while (lastSunday <= end) {
      const ds = lastSunday.toISOString().slice(0, 10);
      if (!dates.includes(ds)) dates.push(ds);
      lastSunday = new Date(lastSunday);
      lastSunday.setDate(lastSunday.getDate() + 7);
    }
    if (!dates.includes(today)) dates.push(today);
  } else if (days === 1825) {
    // 5Y: last day of each month, ~60 points + today
    let year = start.getFullYear();
    let month = start.getMonth();
    while (true) {
      const eom = getLastDayOfMonth(year, month);
      if (eom > end) break;
      const ds = eom.toISOString().slice(0, 10);
      if (!dates.includes(ds)) dates.push(ds);
      month++;
      if (month > 11) { month = 0; year++; }
    }
    if (!dates.includes(today)) dates.push(today);
  } else {
    // 1W, 1M: daily points
    const totalDays = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const maxPoints = 60;
    const step = Math.max(1, Math.floor(totalDays / maxPoints));
    for (let i = step; i <= totalDays; i += step) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      if (d <= end) {
        const ds = d.toISOString().slice(0, 10);
        if (!dates.includes(ds)) dates.push(ds);
      }
    }
    if (!dates.includes(today)) dates.push(today);
  }

  return dates;
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
    start.setFullYear(end.getFullYear() - 2);
  }

  const dates = buildDatesForPeriod(days, start, end);

  // Fetch all dates in parallel (batched)
  const batchSize = 10;
  const results: HistoricalPoint[] = [];

  for (let i = 0; i < dates.length; i += batchSize) {
    const batch = dates.slice(i, i + batchSize);
    const batchResults = await Promise.allSettled(
      batch.map(async (dateStr) => {
        const useLatest = dateStr === end.toISOString().slice(0, 10);
        const data = await fetchWithFallback(useLatest ? 'latest' : dateStr, `currencies/${f}.min.json`);
        return {
          date: new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' }),
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
