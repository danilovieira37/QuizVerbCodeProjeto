'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import pt from '@/messages/pt.json';
import en from '@/messages/en.json';

type Messages = typeof pt;
type Locale = 'pt' | 'en';

type LanguageContextType = {
  locale: Locale;
  t: Messages;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('pt');
  const t = locale === 'pt' ? pt : en;

  return (
    <LanguageContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}
