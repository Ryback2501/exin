import { Currency } from '@/data/currencies';
import { CurrencyIcon } from './CurrencyIcon';
import { cn } from '@/lib/utils';

interface CurrencyPillProps {
  currency: Currency;
  flagSide?: 'left' | 'right';
  size?: 'sm' | 'md';
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export function CurrencyPill({
  currency,
  flagSide = 'left',
  size = 'md',
  active = false,
  disabled = false,
  onClick,
  className,
}: CurrencyPillProps) {
  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-1 gap-1' : 'text-sm px-3 py-1.5 gap-1.5';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'currency-pill',
        sizeClasses,
        active && 'currency-pill-active',
        disabled && 'opacity-40 cursor-not-allowed',
        onClick && !disabled && 'cursor-pointer hover:border-primary/40',
        className
      )}
    >
      {flagSide === 'left' ? (
        <>
          <CurrencyIcon code={currency.code} flag={currency.flag} />
          <span className="font-semibold">{currency.symbol}</span>
        </>
      ) : (
        <>
          <span className="font-semibold">{currency.symbol}</span>
          <CurrencyIcon code={currency.code} flag={currency.flag} />
        </>
      )}
    </button>
  );
}
