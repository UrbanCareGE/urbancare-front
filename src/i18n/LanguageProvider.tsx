'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { TranslationKeys } from './types';
import ka from './locales/ka';
import en from './locales/en';

export type Locale = 'ka' | 'en';

const COOKIE_KEY = 'locale';
const DEFAULT_LOCALE: Locale = 'ka';
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1 year in seconds

const translations: Record<Locale, TranslationKeys> = { ka, en };

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationKeys;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

function setCookie(name: string, value: string, maxAge: number) {
  document.cookie = `${name}=${encodeURIComponent(value)};path=/;max-age=${maxAge};SameSite=Lax`;
}

function getStoredLocale(): Locale {
  if (typeof document === 'undefined') return DEFAULT_LOCALE;
  const stored = getCookie(COOKIE_KEY);
  if (stored === 'ka' || stored === 'en') return stored;
  return DEFAULT_LOCALE;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getStoredLocale);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    setCookie(COOKIE_KEY, newLocale, COOKIE_MAX_AGE);
    document.documentElement.lang = newLocale;
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value: LanguageContextValue = {
    locale,
    setLocale,
    t: translations[locale],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}

export function useTranslation() {
  const { t } = useLanguage();
  return t;
}
