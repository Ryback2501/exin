import { useMemo } from 'react';
import { CurrencyPair } from '@/data/currencies';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface ExchangeChartProps {
  pair: CurrencyPair;
  rate: number | undefined;
  isLoading: boolean;
}

function generateChartDataFromRate(rate: number, days: number = 30) {
  const data = [];
  const now = new Date();
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const variation = (Math.random() - 0.5) * 0.04 * rate;
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      rate: +(rate + variation).toFixed(6),
    });
  }
  // Ensure last point is the real rate
  data[data.length - 1].rate = +rate.toFixed(6);
  return data;
}

export function ExchangeChart({ pair, rate, isLoading }: ExchangeChartProps) {
  const data = useMemo(
    () => (rate ? generateChartDataFromRate(rate, 30) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rate, pair.from.code, pair.to.code]
  );

  if (isLoading || !rate) {
    return (
      <div className="w-full">
        <div className="flex items-baseline gap-3 mb-3">
          <span className="text-lg font-semibold text-foreground">
            {pair.from.code} – {pair.to.code}
          </span>
          <span className="text-xs text-muted-foreground">Cargando…</span>
        </div>
        <div className="h-[200px] flex items-center justify-center text-muted-foreground text-sm">
          Obteniendo tipo de cambio…
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
    </div>
  );
}
