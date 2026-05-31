import { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';

const darkQuery = () => window.matchMedia('(prefers-color-scheme: dark)');

// Single source of truth for theming:
//  - reflects the chosen theme onto <html data-theme> ('system' removes the
//    attribute so the CSS prefers-color-scheme media query takes over)
//  - tracks the OS preference so `resolved` is always 'light' | 'dark'
export function useTheme() {
  const theme = useStore((s) => s.theme);        // 'system' | 'light' | 'dark'
  const setTheme = useStore((s) => s.setTheme);
  const [systemDark, setSystemDark] = useState(() => darkQuery().matches);

  useEffect(() => {
    const m = darkQuery();
    const onChange = (e) => setSystemDark(e.matches);
    m.addEventListener('change', onChange);
    return () => m.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    // Suppress transitions for the frame the theme flips, so colors snap to the
    // new theme instead of half-animating a var() change (which can stick).
    root.classList.add('theme-switching');
    if (theme === 'system') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', theme);
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => root.classList.remove('theme-switching')),
    );
    return () => cancelAnimationFrame(id);
  }, [theme]);

  const resolved = theme === 'system' ? (systemDark ? 'dark' : 'light') : theme;
  return { theme, setTheme, resolved };
}
