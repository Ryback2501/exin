import { useQuery } from '@tanstack/react-query';
import { fetchPairRate, fetchHistoricalRates, HistoricalPoint } from '@/services/exchangeRateApi';

export function useExchangeRate(from: string, to: string) {
  return useQuery({
    queryKey: ['exchange-rate', from, to],
    queryFn: () => fetchPairRate(from, to),
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });
}

export function useHistoricalRates(from: string, to: string, days: number = 30) {
  return useQuery<HistoricalPoint[]>({
    queryKey: ['historical-rates', from, to, days],
    queryFn: () => fetchHistoricalRates(from, to, days),
    staleTime: 30 * 60 * 1000,
  });
}
