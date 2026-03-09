import { useState, useMemo } from 'react';
import { currencies, Currency } from '@/data/currencies';
import { CurrencyPill } from './CurrencyPill';
import { CurrencyIcon } from './CurrencyIcon';
import { Search, X, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CurrencyPairSelectorProps {
  onAccept: (from: Currency, to: Currency) => void;
  onCancel: () => void;
  initialFrom?: Currency;
  initialTo?: Currency;
}

export function CurrencyPairSelector({ onAccept, onCancel, initialFrom, initialTo }: CurrencyPairSelectorProps) {
  const [from, setFrom] = useState<Currency | null>(initialFrom || null);
  const [to, setTo] = useState<Currency | null>(initialTo || null);
  const [selectingSide, setSelectingSide] = useState<'from' | 'to'>('from');
  const [search, setSearch] = useState('');

  const filteredCurrencies = useMemo(() => {
    if (!search.trim()) return currencies;
    const terms = search.toLowerCase().split(/\s+/).filter(Boolean);
    return currencies.filter((c) =>
      terms.some(
        (term) =>
          c.code.toLowerCase().includes(term) ||
          c.symbol.toLowerCase().includes(term) ||
          c.name.toLowerCase().includes(term) ||
          c.country.toLowerCase().includes(term)
      )
    );
  }, [search]);

  const handleSelect = (currency: Currency) => {
    if (selectingSide === 'from') {
      if (to && to.code === currency.code) return;
      setFrom(currency);
      setSelectingSide('to');
    } else {
      if (from && from.code === currency.code) return;
      setTo(currency);
      setSelectingSide('from');
    }
    setSearch('');
  };

  const isDisabled = (currency: Currency) => {
    if (selectingSide === 'from') return to?.code === currency.code;
    return from?.code === currency.code;
  };

  const canAccept = from && to;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm" onClick={onCancel}>
      <div
        className="glass-panel w-full max-w-lg mx-4 p-6 flex flex-col gap-4 max-h-[80vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Selected pair preview */}
        <div className="flex items-center justify-center gap-3">
          <div
            className={cn(
              'currency-pill min-w-[100px] justify-center',
              selectingSide === 'from' && 'ring-2 ring-primary ring-offset-2 ring-offset-card'
            )}
            onClick={() => setSelectingSide('from')}
          >
            {from ? (
              <>
                <CurrencyIcon code={from.code} flag={from.flag} />
                <span className="font-semibold">{from.symbol}</span>
              </>
            ) : (
              <span className="text-muted-foreground">Select</span>
            )}
          </div>
          <span className="text-muted-foreground font-bold">→</span>
          <div
            className={cn(
              'currency-pill min-w-[100px] justify-center',
              selectingSide === 'to' && 'ring-2 ring-primary ring-offset-2 ring-offset-card'
            )}
            onClick={() => setSelectingSide('to')}
          >
            {to ? (
              <>
                <CurrencyIcon code={to.code} flag={to.flag} />
                <span className="font-semibold">{to.symbol}</span>
              </>
            ) : (
              <span className="text-muted-foreground">Select</span>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Selecting: <span className="text-primary font-medium">{selectingSide === 'from' ? 'Source' : 'Target'}</span> currency
        </p>

        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by code, symbol, country..."
            className="w-full pl-9 pr-3 py-2.5 bg-muted/50 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X size={14} />
            </button>
          )}
        </div>

        {/* Currency grid */}
        <div className="overflow-y-auto flex-1 min-h-0">
          <div className="grid grid-cols-3 gap-2">
            {filteredCurrencies.map((currency) => {
              const disabled = isDisabled(currency);
              const isSelected = from?.code === currency.code || to?.code === currency.code;
              return (
                <button
                  key={currency.code}
                  onClick={() => !disabled && handleSelect(currency)}
                  disabled={disabled}
                  className={cn(
                    'currency-pill justify-center text-xs gap-1',
                    isSelected && 'currency-pill-active',
                    disabled && 'opacity-30 cursor-not-allowed',
                    !disabled && 'hover:border-primary/40 cursor-pointer'
                  )}
                >
                  <span className="text-base leading-none">{currency.flag}</span>
                  <span className="font-semibold">{currency.code}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2 border-t border-border">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
          >
            Cancel
          </button>
          <button
            onClick={() => canAccept && onAccept(from, to)}
            disabled={!canAccept}
            className={cn(
              'px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5',
              canAccept
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            )}
          >
            <Check size={14} />
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
