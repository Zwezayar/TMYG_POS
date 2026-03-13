'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/components/language-provider';

type Language = 'en' | 'mm';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="inline-flex items-center rounded-full bg-secondary/60 p-0.5 text-xs">
      <button
        type="button"
        className={cn(
          'px-2 py-1 rounded-full transition-colors',
          language === 'en'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground'
        )}
        onClick={() => setLanguage('en')}
      >
        EN
      </button>
      <button
        type="button"
        className={cn(
          'px-2 py-1 rounded-full transition-colors font-[Pyidaungsu]',
          language === 'mm'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground'
        )}
        onClick={() => setLanguage('mm')}
      >
        မြန်မာ
      </button>
    </div>
  );
}

