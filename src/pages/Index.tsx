import { useState, useCallback } from 'react';
import { currencies, CurrencyPair, Currency } from '@/data/currencies';
import { TabNavigator } from '@/components/TabNavigator';
import { CurrencyPairSelector } from '@/components/CurrencyPairSelector';
import { ExchangeChart } from '@/components/ExchangeChart';
import { ConversionTable } from '@/components/ConversionTable';
import { TrendingUp } from 'lucide-react';

let pairIdCounter = 0;
function createPair(from: Currency, to: Currency): CurrencyPair {
  return { id: `pair-${++pairIdCounter}`, from, to };
}

const defaultPair = createPair(currencies[0], currencies[1]); // USD/EUR

const Index = () => {
  const [tabs, setTabs] = useState<CurrencyPair[]>([defaultPair]);
  const [activeTabId, setActiveTabId] = useState<string>(defaultPair.id);
  const [showSelector, setShowSelector] = useState(false);

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  const handleAddTab = () => setShowSelector(true);

  const handleCloseTab = useCallback(
    (id: string) => {
      setTabs((prev) => {
        if (prev.length <= 1) return prev;
        const filtered = prev.filter((t) => t.id !== id);
        if (activeTabId === id) {
          setActiveTabId(filtered[0].id);
        }
        return filtered;
      });
    },
    [activeTabId]
  );

  const handleAcceptPair = (from: Currency, to: Currency) => {
    const pair = createPair(from, to);
    setTabs((prev) => [...prev, pair]);
    setActiveTabId(pair.id);
    setShowSelector(false);
  };

  const handleSwapColumns = () => {
    setTabs((prev) =>
      prev.map((t) => (t.id === activeTabId ? { ...t, from: t.to, to: t.from } : t))
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center gap-3 px-6 py-3 border-b border-border bg-card/50">
        <TrendingUp size={20} className="text-primary" />
        <h1 className="text-sm font-semibold text-foreground tracking-tight">Currency Converter</h1>
      </header>

      {/* Tab Navigator */}
      <TabNavigator
        tabs={tabs}
        activeTabId={activeTabId}
        onSelectTab={setActiveTabId}
        onCloseTab={handleCloseTab}
        onAddTab={handleAddTab}
      />

      {/* Content */}
      {activeTab && (
        <div className="flex-1 p-6 max-w-4xl mx-auto w-full space-y-6">
          <ExchangeChart pair={activeTab} />
          <ConversionTable pair={activeTab} onSwap={handleSwapColumns} />
        </div>
      )}

      {/* Selector Modal */}
      {showSelector && (
        <CurrencyPairSelector onAccept={handleAcceptPair} onCancel={() => setShowSelector(false)} />
      )}
    </div>
  );
};

export default Index;
