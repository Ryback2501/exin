import { cn } from '@/lib/utils';

const CRYPTO_ICONS: Record<string, string> = {
  BTC: '/crypto/btc.svg',
  ETH: '/crypto/eth.svg',
  XRP: '/crypto/xrp.svg',
  SOL: '/crypto/sol.svg',
  DOGE: '/crypto/doge.svg',
};

interface CurrencyIconProps {
  code: string;
  flag: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function CurrencyIcon({ code, flag, size = 'md', className }: CurrencyIconProps) {
  const cryptoSrc = CRYPTO_ICONS[code.toUpperCase()];
  const sizeClass = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-7 h-7' : 'w-5 h-5';

  if (cryptoSrc) {
    return <img src={cryptoSrc} alt={code} className={cn(sizeClass, 'inline-block', className)} />;
  }

  const textSize = size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-lg';
  return <span className={cn(textSize, 'leading-none', className)}>{flag}</span>;
}
