import { cookies } from 'next/headers';
import type { Locale } from './LanguageProvider';
import type { TranslationKeys } from './types';
import ka from './locales/ka';
import en from './locales/en';

const translations: Record<Locale, TranslationKeys> = { ka, en };

export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const stored = cookieStore.get('locale')?.value;
  if (stored === 'ka' || stored === 'en') return stored;
  return 'ka';
}

export async function getServerTranslation(): Promise<TranslationKeys> {
  const locale = await getServerLocale();
  return translations[locale];
}
