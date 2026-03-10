import { CurrencyPair } from '@/data/currencies';
import { CurrencyIcon } from './CurrencyIcon';
import { Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TabNavigatorProps {
  tabs: CurrencyPair[];
  activeTabId: string | null;
  onSelectTab: (id: string) => void;
  onCloseTab: (id: string) => void;
  onAddTab: () => void;
}

export function TabNavigator({ tabs, activeTabId, onSelectTab, onCloseTab, onAddTab }: TabNavigatorProps) {
  return (
    <div className="flex items-stretch border-b border-border bg-muted/30 overflow-x-auto shrink-0">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={cn(
            'group flex items-center gap-1.5 px-3 py-2.5 cursor-pointer border-r border-border min-w-0 shrink-0 select-none touch-manipulation',
            activeTabId === tab.id ? 'tab-active' : 'tab-inactive'
          )}
          onPointerDown={() => onSelectTab(tab.id)}
        >
          <CurrencyIcon code={tab.from.code} flag={tab.from.flag} size="sm" />
          <span className="text-xs font-semibold">{tab.from.symbol}</span>
          <span className="text-muted-foreground text-xs">/</span>
          <span className="text-xs font-semibold">{tab.to.symbol}</span>
          <CurrencyIcon code={tab.to.code} flag={tab.to.flag} size="sm" />
          {tabs.length > 1 && (
            <button
              onPointerDown={(e) => {
                e.stopPropagation();
                onCloseTab(tab.id);
              }}
              className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded hover:bg-destructive/20 text-muted-foreground hover:text-destructive"
            >
              <X size={12} />
            </button>
          )}
        </div>
      ))}
      <button
        onClick={onAddTab}
        className="flex items-center gap-1 px-4 py-2.5 text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors border-r border-border shrink-0"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
