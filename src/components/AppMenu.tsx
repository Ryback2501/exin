import { useState } from 'react';
import { Menu, Sun, Moon, Info } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface AppMenuProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export function AppMenu({ theme, onToggleTheme }: AppMenuProps) {
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
            <Menu size={18} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[180px]">
          <DropdownMenuItem onClick={onToggleTheme}>
            {theme === 'dark' ? <Moon className="mr-2 h-4 w-4" /> : <Sun className="mr-2 h-4 w-4" />}
            Appearance
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setInfoOpen(true)}>
            <Info className="mr-2 h-4 w-4" />
            Information
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={infoOpen} onOpenChange={setInfoOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>About Exin</DialogTitle>
          <DialogDescription asChild>
              <div className="pt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                Exin is a free, open-source currency exchange viewer built as an experiment in vibe coding with Lovable.
              </p>
              <p>
                Exchange rate data is provided by the{' '}
                <a
                  href="https://github.com/fawazahmed0/exchange-api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-2 hover:opacity-80"
                >
                  Currency API
                </a>{' '}
                by fawazahmed0.
              </p>
              <p>
                For more information, source code, and contributions, visit the project repository on{' '}
                <a
                  href="https://github.com/Ryback2501/exin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-2 hover:opacity-80"
                >
                  GitHub
                </a>
                .
              </p>
            </div>
          </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
