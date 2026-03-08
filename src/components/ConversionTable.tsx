import { useCallback } from 'react';
import { CurrencyPair, ConversionRow } from '@/data/currencies';
import { ArrowLeftRight, Trash2 } from 'lucide-react';

interface ConversionTableProps {
  pair: CurrencyPair;
  rows: ConversionRow[];
  onRowsChange: (rows: ConversionRow[]) => void;
  onSwap: () => void;
  rate: number | undefined;
}

let rowIdCounter = 1000;
function newRow(): ConversionRow {
  return { id: `row-${++rowIdCounter}`, fromAmount: '', toAmount: '' };
}

export function ConversionTable({ pair, rows, onRowsChange, onSwap, rate }: ConversionTableProps) {
  const effectiveRate = rate ?? 1;
  const reverseRate = effectiveRate ? 1 / effectiveRate : 1;

  const handleFromChange = useCallback(
    (id: string, value: string) => {
      const updated = rows.map((r) => {
        if (r.id !== id) return r;
        const num = parseFloat(value);
        return {
          ...r,
          fromAmount: value,
          toAmount: value && !isNaN(num) ? (num * effectiveRate).toFixed(2) : '',
        };
      });
      const last = updated[updated.length - 1];
      if (last.fromAmount || last.toAmount) {
        updated.push(newRow());
      }
      onRowsChange(updated);
    },
    [effectiveRate, rows, onRowsChange]
  );

  const handleToChange = useCallback(
    (id: string, value: string) => {
      const updated = rows.map((r) => {
        if (r.id !== id) return r;
        const num = parseFloat(value);
        return {
          ...r,
          toAmount: value,
          fromAmount: value && !isNaN(num) ? (num * reverseRate).toFixed(2) : '',
        };
      });
      const last = updated[updated.length - 1];
      if (last.fromAmount || last.toAmount) {
        updated.push(newRow());
      }
      onRowsChange(updated);
    },
    [reverseRate, rows, onRowsChange]
  );

  const removeRow = (id: string) => {
    if (rows.length <= 1) return;
    onRowsChange(rows.filter((r) => r.id !== id));
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-muted-foreground">Conversions</h3>
        <button
          onClick={onSwap}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors px-2 py-1 rounded hover:bg-muted"
        >
          <ArrowLeftRight size={14} />
          Swap columns
        </button>
      </div>
      <div className="border border-border rounded-lg overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[1fr_1fr_40px] bg-muted/50">
          <div className="px-4 py-2.5 text-sm font-medium text-foreground flex items-center gap-2 border-r border-border">
            <span className="text-2xl leading-none">{pair.from.flag}</span>
            <span className="text-muted-foreground">{pair.from.symbol}</span>
          </div>
          <div className="px-4 py-2.5 text-sm font-medium text-foreground flex items-center gap-2">
            <span className="text-2xl leading-none">{pair.to.flag}</span>
            <span className="text-muted-foreground">{pair.to.symbol}</span>
          </div>
          <div />
        </div>
        {/* Rows */}
        {rows.map((row, idx) => {
          const isLast = idx === rows.length - 1;
          return (
            <div key={row.id} className="grid grid-cols-[1fr_1fr_40px] border-t border-border">
              <div className="border-r border-border">
                <input
                  type="number"
                  inputMode="decimal"
                  value={row.fromAmount}
                  onChange={(e) => handleFromChange(row.id, e.target.value)}
                  placeholder="0.00"
                  className="w-full px-4 py-2.5 bg-transparent text-sm font-mono text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:bg-primary/5"
                />
              </div>
              <div>
                <input
                  type="number"
                  value={row.toAmount}
                  onChange={(e) => handleToChange(row.id, e.target.value)}
                  placeholder="0.00"
                  className="w-full px-4 py-2.5 bg-transparent text-sm font-mono text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:bg-primary/5"
                />
              </div>
              <div className="flex items-center justify-center">
                {!isLast && (
                  <button
                    onClick={() => removeRow(row.id)}
                    className="p-1 text-muted-foreground hover:text-destructive transition-colors rounded hover:bg-destructive/10"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        Rate: 1 {pair.from.code} = {rate ? rate.toFixed(4) : '…'} {pair.to.code}
      </p>
    </div>
  );
}
