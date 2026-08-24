'use client';

import * as React from 'react';

export function useDebounce<T>(value: T, delayMs: number = 300): T {
  const [debounced, setDebounced] = React.useState<T>(value);

  React.useEffect(() => {
    if (delayMs <= 0) {
      setDebounced(value);
      return;
    }
    const t = window.setTimeout(() => {
      setDebounced(value);
    }, delayMs);
    return () => {
      window.clearTimeout(t);
    };
  }, [value, delayMs]);

  return debounced;
}
