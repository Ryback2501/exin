import { CurrencyPair } from '@/data/currencies';
import { CurrencyPill } from './CurrencyPill';
import { cn } from '@/lib/utils';

interface CurrencyPairDisplayProps {
  pair: CurrencyPair;
  size?: 'sm' | 'md';
  className?: string;
}

export function CurrencyPairDisplay({ pair, size = 'sm', className }: CurrencyPairDisplayProps) {
  return (
    <div className={cn('inline-flex items-center -space-x-1', className)}>
      <CurrencyPill currency={pair.from} flagSide="left" size={size} />
      <CurrencyPill currency={pair.to} flagSide="right" size={size} />
    </div>
  );
}
