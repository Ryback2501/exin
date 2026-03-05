import { useQuery } from '@tanstack/react-query';
import { fetchPairRate } from '@/services/exchangeRateApi';

export function useExchangeRate(from: string, to: string) {
  return useQuery({
    queryKey: ['exchange-rate', from, to],
    queryFn: () => fetchPairRate(from, to),
    staleTime: 5 * 60 * 1000, // 5 min
    refetchInterval: 5 * 60 * 1000,
  });
}
