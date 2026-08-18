import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'easybreethy-theme';
const THEMES = ['system', 'light', 'dark'];

function readStoredTheme() {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return THEMES.includes(stored) ? stored : 'system';
}

export function useTheme() {
  const [theme, setTheme] = useState(readStoredTheme);

  useEffect(() => {
    if (theme === 'system') {
      document.documentElement.removeAttribute('data-theme');
      window.localStorage.removeItem(STORAGE_KEY);
    } else {
      document.documentElement.setAttribute('data-theme', theme);
      window.localStorage.setItem(STORAGE_KEY, theme);
    }
  }, [theme]);

  const selectTheme = useCallback((next) => {
    if (THEMES.includes(next)) setTheme(next);
  }, []);

  return { theme, setTheme: selectTheme };
}
