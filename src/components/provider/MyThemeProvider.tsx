'use client';

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

/**
 * Tiny theme provider that replaces `next-themes`. Avoids the inline <script>
 * injection from `next-themes` 0.4.x which trips React 19's
 * "Encountered a script tag" check.
 *
 * Persists theme in localStorage; toggles the `dark` class on <html>. The root
 * layout sets `<html class="dark">` statically so dark-theme users (the
 * default) see no flash. Light-theme users see one dark frame on first paint
 * before this provider takes over.
 */

export type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = 'theme';
const DEFAULT_THEME: Theme = 'dark';

const applyHtmlClass = (theme: Theme) => {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(theme);
};

export default function MyThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);

  // Hydrate from localStorage after mount so SSR markup (always default) stays
  // stable for the first paint, then the provider syncs to persisted choice.
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      setThemeState(stored);
      applyHtmlClass(stored);
    } else {
      applyHtmlClass(DEFAULT_THEME);
    }
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    applyHtmlClass(next);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within MyThemeProvider');
  }
  return ctx;
}
