'use client';

import * as React from 'react';

export type Language = 'en' | 'mm';

interface LanguageContextValue {
  language: Language;
  setLanguage: (value: Language) => void;
}

const LanguageContext = React.createContext<LanguageContextValue | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = React.useState<Language>('en');

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem('tmyg-lang') as Language | null;
    if (stored === 'en' || stored === 'mm') {
      setLanguage(stored);
      document.documentElement.lang = stored === 'en' ? 'en' : 'my';
    }
  }, []);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('tmyg-lang', language);
    document.documentElement.lang = language === 'en' ? 'en' : 'my';
  }, [language]);

  const value = React.useMemo(
    () => ({ language, setLanguage }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = React.useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
}

const translations = {
  en: {
    appName: 'The More You Glow By Ingyin POS',
    appShort: 'The More You Glow By Ingyin',
    dashboardSubtitle: 'POS Dashboard',
    loginBadge: 'Sign in to The More You Glow By Ingyin',
    loginHeading: 'Welcome back',
    loginButton: 'Sign in',
    loginEmail: 'Email',
    loginPassword: 'Password',
    dashboardOverview: 'Overview',
    dashboardSubtext: 'Daily, monthly, and yearly performance at a glance.',
    inventoryTitle: 'Inventory',
    inventorySubtext: 'Manage products, prices, and stock levels.',
    addProduct: 'Add product',
  },
  mm: {
    appName: 'THE MORE YOU GLOW By Ingyin POS',
    appShort: 'The More You Glow By Ingyin',
    dashboardSubtitle: 'အရောင်းစနစ်',
    loginBadge: 'The More You Glow By Ingyin သို့ ဝင်ရောက်ပါ',
    loginHeading: 'ပြန်လည်ကြိုဆိုပါတယ်',
    loginButton: 'လော့ဂ်အင်ဝင်မည်',
    loginEmail: 'အီးမေးလ်',
    loginPassword: 'လျှို့ဝှက်နံပါတ်',
    dashboardOverview: 'အထွေထွေ အမြင်',
    dashboardSubtext: 'နေ့စဉ် / လစဉ် / နှစ်အလိုက် အရောင်း အခြေအနေ။',
    inventoryTitle: 'ကုန်ပစ္စည်း စာရင်း',
    inventorySubtext: 'အရောင်းဈေးနှုန်း၊ စတော့နှင့် ကုန်ပစ္စည်းများ စီမံခန့်ခွဲရန်။',
    addProduct: 'ကုန်ပစ္စည်းအသစ် ထည့်မည်',
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

export function useT() {
  const { language } = useLanguage();
  return (key: TranslationKey) => translations[language][key];
}

