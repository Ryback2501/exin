import { useState } from 'react';
import { CurrencyPair } from '@/data/currencies';
import { HistoricalPoint } from '@/services/exchangeRateApi';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const PERIODS = [
  { label: '1W', days: 7 },
  { label: '1M', days: 30 },
  { label: '1Y', days: 365 },
  { label: '5Y', days: 1825 },
] as const;

interface ExchangeChartProps {
  pair: CurrencyPair;
  rate: number | undefined;
  isLoading: boolean;
  historicalData: HistoricalPoint[];
  isLoadingHistory: boolean;
  onPeriodChange?: (days: number) => void;
}

export function ExchangeChart({ pair, rate, isLoading, historicalData, isLoadingHistory, onPeriodChange }: ExchangeChartProps) {
  const [activePeriod, setActivePeriod] = useState(30);
  const data = historicalData ?? [];

  const handlePeriod = (days: number) => {
    setActivePeriod(days);
    onPeriodChange?.(days);
  };

  if (isLoading || isLoadingHistory || !rate || data.length === 0) {
    return (
      <div className="w-full">
        <div className="flex items-baseline gap-3 mb-3">
          <span className="text-lg font-semibold text-foreground">
            {pair.from.code} – {pair.to.code}
          </span>
          <span className="text-xs text-muted-foreground">Loading…</span>
        </div>
        <div className="h-[200px] flex items-center justify-center text-muted-foreground text-sm">
          Obtaining exchange rate…
        </div>
        <div className="flex gap-1 mt-2">
          {PERIODS.map((p) => (
            <button key={p.label} onClick={() => handlePeriod(p.days)}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${activePeriod === p.days ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'}`}>
              {p.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const minRate = Math.min(...data.map((d) => d.rate));
  const maxRate = Math.max(...data.map((d) => d.rate));
  const isUp = data[data.length - 1].rate >= data[0].rate;

  return (
    <div className="w-full">
      <div className="flex items-baseline gap-3 mb-3">
        <span className="text-lg font-semibold text-foreground">
          {pair.from.code} – {pair.to.code}
        </span>
        <span className="text-xs text-muted-foreground">
          1 {pair.from.code} = {rate.toFixed(4)} {pair.to.code}
        </span>
        <span className={`text-xs font-medium ${isUp ? 'text-chart-up' : 'text-chart-down'}`}>
          {isUp ? '▲' : '▼'} {Math.abs(((data[data.length - 1].rate - data[0].rate) / data[0].rate) * 100).toFixed(2)}%
        </span>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 4 }}>
          <defs>
            <linearGradient id={`gradient-${pair.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isUp ? 'hsl(152, 60%, 50%)' : 'hsl(0, 72%, 55%)'} stopOpacity={0.3} />
              <stop offset="100%" stopColor={isUp ? 'hsl(152, 60%, 50%)' : 'hsl(0, 72%, 55%)'} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'hsl(215, 12%, 55%)' }} axisLine={false} tickLine={false} />
          <YAxis domain={[minRate * 0.998, maxRate * 1.002]} hide />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(220, 18%, 13%)',
              border: '1px solid hsl(220, 14%, 20%)',
              borderRadius: '8px',
              fontSize: '12px',
              color: 'hsl(210, 20%, 92%)',
            }}
            formatter={(value: number) => [value.toFixed(6), 'Rate']}
          />
          <Area
            type="monotone"
            dataKey="rate"
            stroke={isUp ? 'hsl(152, 60%, 50%)' : 'hsl(0, 72%, 55%)'}
            strokeWidth={2}
            fill={`url(#gradient-${pair.id})`}
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="flex gap-1 mt-2">
        {PERIODS.map((p) => (
          <button key={p.label} onClick={() => handlePeriod(p.days)}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${activePeriod === p.days ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'}`}>
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}
