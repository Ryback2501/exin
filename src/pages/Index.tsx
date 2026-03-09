import { useState, useCallback } from 'react';
import { currencies, CurrencyPair, Currency, ConversionRow } from '@/data/currencies';
import { TabNavigator } from '@/components/TabNavigator';
import { CurrencyPairSelector } from '@/components/CurrencyPairSelector';
import { ExchangeChart } from '@/components/ExchangeChart';
import { ConversionTable } from '@/components/ConversionTable';
import { AppMenu } from '@/components/AppMenu';
import { TrendingUp } from 'lucide-react';
import { useExchangeRate, useHistoricalRates } from '@/hooks/useExchangeRate';
import { useTheme } from '@/hooks/useTheme';

let pairIdCounter = 0;
function createPair(from: Currency, to: Currency): CurrencyPair {
  return { id: `pair-${++pairIdCounter}`, from, to };
}

let rowIdCounter = 0;
function newRow(): ConversionRow {
  return { id: `row-${++rowIdCounter}`, fromAmount: '', toAmount: '' };
}

const defaultPair = createPair(currencies[0], currencies[1]); // USD/EUR

const Index = () => {
  const { theme, toggleTheme } = useTheme();
  const [tabs, setTabs] = useState<CurrencyPair[]>([defaultPair]);
  const [activeTabId, setActiveTabId] = useState<string>(defaultPair.id);
  const [showSelector, setShowSelector] = useState(false);
  const [tabRows, setTabRows] = useState<Record<string, ConversionRow[]>>({
    [defaultPair.id]: [newRow()],
  });
  const [historyDays, setHistoryDays] = useState(30);

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  const { data: rate, isLoading } = useExchangeRate(activeTab.from.code, activeTab.to.code);
  const { data: historicalData, isLoading: isLoadingHistory } = useHistoricalRates(activeTab.from.code, activeTab.to.code, historyDays);

  const handleAddTab = () => setShowSelector(true);

  const handleCloseTab = useCallback(
    (id: string) => {
      setTabs((prev) => {
        if (prev.length <= 1) return prev;
        const filtered = prev.filter((t) => t.id !== id);
        if (activeTabId === id) {
          setActiveTabId(filtered[0].id);
        }
        setTabRows((r) => {
          const copy = { ...r };
          delete copy[id];
          return copy;
        });
        return filtered;
      });
    },
    [activeTabId]
  );

  const handleAcceptPair = (from: Currency, to: Currency) => {
    const pair = createPair(from, to);
    setTabs((prev) => [...prev, pair]);
    setTabRows((prev) => ({ ...prev, [pair.id]: [newRow()] }));
    setActiveTabId(pair.id);
    setShowSelector(false);
  };

  const handleSwapColumns = () => {
    setTabs((prev) =>
      prev.map((t) => t.id === activeTabId ? { ...t, from: t.to, to: t.from } : t)
    );
    setTabRows((prev) => ({
      ...prev,
      [activeTabId]: (prev[activeTabId] || []).map((r) => ({
        ...r,
        fromAmount: r.toAmount,
        toAmount: r.fromAmount,
      })),
    }));
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      {/* Header */}
      <header className="flex items-center gap-3 px-6 py-3 border-b border-border bg-card/50 shrink-0">
        <TrendingUp size={20} className="text-primary" />
        <h1 className="text-sm font-semibold text-foreground tracking-tight">Exin</h1>
        <div className="ml-auto">
          <AppMenu theme={theme} onToggleTheme={toggleTheme} />
        </div>
      </header>

      {/* Tab Navigator */}
      <TabNavigator tabs={tabs} activeTabId={activeTabId}
        onSelectTab={setActiveTabId}
        onCloseTab={handleCloseTab}
        onAddTab={handleAddTab} />

      {/* Content */}
      {activeTab &&
        <div className="flex-1 overflow-y-auto p-6 max-w-4xl mx-auto w-full space-y-6">
          <ExchangeChart pair={activeTab} rate={rate} isLoading={isLoading} historicalData={historicalData || []} isLoadingHistory={isLoadingHistory} onPeriodChange={setHistoryDays} />
          <ConversionTable
            pair={activeTab}
            rows={tabRows[activeTab.id] || [newRow()]}
            onRowsChange={(rows) => setTabRows((prev) => ({ ...prev, [activeTab.id]: rows }))}
            onSwap={handleSwapColumns}
            rate={rate}
          />
        </div>
      }

      {/* Selector Modal */}
      {showSelector &&
        <CurrencyPairSelector onAccept={handleAcceptPair} onCancel={() => setShowSelector(false)} />
      }
    </div>
  );
};

export default Index;
