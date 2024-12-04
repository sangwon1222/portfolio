'use client';
import { PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';
import ThemeContext from './themeContext';

const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const init = (localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light') as
    | 'light'
    | 'dark';
  const [theme, setTheme] = useState<ThemeType>(init);
  const toggleTheme = useCallback(
    () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light')),
    []
  );
  const value = useMemo<ThemeContextType>(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  useEffect(() => {
    const storedTheme = (typeof window !== 'undefined' && localStorage?.getItem('theme')) as
      | ThemeType
      | undefined;
    if (storedTheme) setTheme(storedTheme);
  }, []);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
