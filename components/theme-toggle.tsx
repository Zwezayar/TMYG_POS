'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const current = theme ?? 'dark';
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="inline-flex items-center rounded-full bg-secondary/60 p-0.5 text-xs">
      <button
        type="button"
        className={cn(
          'px-2 py-1 rounded-full transition-colors',
          current === 'light'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground'
        )}
        onClick={() => setTheme('light')}
      >
        Light
      </button>
      <button
        type="button"
        className={cn(
          'px-2 py-1 rounded-full transition-colors',
          current === 'dark'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground'
        )}
        onClick={() => setTheme('dark')}
      >
        Dark
      </button>
    </div>
  );
}
